var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var scadastation = require('../models/scadastation.js');//지역및 변젼소
var faultlogic = require('../models/faultlogic.js');//고장판단로직
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var list_createlistbox = require('../views/list_createlistbox.js');//리스트박스 생성
var list_userinfolist = require('../views/list_userinfolist.js');//유저리스트 테이블화
oracledb.autoCommit = true;
//페이지 불러오기
var g_src = fs.readFileSync(__dirname+'/../views/frame_main.ejs', 'utf8');//main frame
var g_src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');//top frame
var g_src_body = fs.readFileSync(__dirname+'/../views/frame_body.ejs', 'utf8');//body frame
var g_src_bottom = fs.readFileSync(__dirname+'/../views/frame_bottom.ejs', 'utf8');//bottom frame
var g_controls=fs.readFileSync(__dirname+'/../views/list_button.ejs','utf8');//컨트롤 버튼 ejs
var g_userview_listbox = fs.readFileSync(__dirname+'/../views/list_listboxfunction.ejs','utf8');//리스트박스 ejs
var g_name = fs.readFileSync(__dirname+'/../views/list_column.ejs','utf8');//user data column name
var g_search = fs.readFileSync(__dirname+'/../views/list_search.ejs','utf8');
var g_insertform = fs.readFileSync(__dirname+'/../views/form.ejs', 'utf8');
var g_page; //response print page 변수
var g_data; //userlist 저장변수
var g_userview; //user listbox ejs
var g_area;   // listbox 지역
var g_reason; // listbox 구역
var g_station; //listbox 변전소

function UserinfoAllUser(_res)//모든 유저리스트 생성
{
    userinfo.AllUser(50010000, function(err, list)
    {
      var bodydata;
      g_data = list_userinfolist.UserinfoCreatelist(list.rows);

      bodydata = ejs.render(g_src_body,
      {
        userview: g_userview,
        search:g_search,
        dbname: g_name,
        dbdata: g_data,
        fault_list:'',
        hidden_check: '',
        hidden_check_length: ''
      });
      g_page = ejs.render(g_src,
      {
        frame_top: g_src_top,
        frame_body: bodydata,
        frame_bottom:g_controls,

      });
      _res.writeHead(200);
      _res.end(g_page);
  });
}


function UserinfoLogicUser(_res, _logic)//고장판단로직 유저리스트 생성
{
  userinfo.UserLogic(_logic,function(err, list)
    {
      var count;
      var bodydata;
      console.log(list);
      g_data = list_userinfolist.UserinfoCreatelist(list.rows);

      var bodydata = ejs.render(g_src_body,
      {
        userview: g_userview,
        search:g_search,
        dbname: g_name,
        dbdata: g_data,
        fault_list:'',
        hidden_check: '',
        hidden_check_length: ''
      });

      g_page = ejs.render(g_src,
      {
        frame_top: g_src_top,
        frame_body: bodydata,
        frame_bottom:g_controls
      });

      _res.writeHead(200);
      _res.end(g_page);
    });
}

function UserinfoAreaUser(_res, _area, _reason, _station)//지역관련 유저리스트 생성
{
  console.log(`userinfo_areauser 함수 동작`);
    userinfo.UserArea(_area, _reason, _station, function(err, list)
    {
      console.log(`userinfo_area 함수 동작`);
      var count;
      var bodydata;

      g_data = list_userinfolist.UserinfoCreatelist(list.rows);

      var bodydata = ejs.render(g_src_body,
      {
        userview: g_userview,
        search:g_search,
        dbname: g_name,
        dbdata: g_data,
        fault_list:'',
        hidden_check: '',
        hidden_check_length: ''
      });

      g_page = ejs.render(g_src,
      {
        frame_top: g_src_top,
        frame_body: bodydata,
        frame_bottom:g_controls
      });

      _res.writeHead(200);
      _res.end(g_page);
    });
}
function Area()
{
  scadastation.AreaSearch(5009999,Reason);//scadastation 계통
}
function Reason(_area)
{
  g_area = _area;
  scadastation.	Reason168(5009998,Station);//scadastation 구역
}
function Station(_reason)
{
  g_reason=_reason;
  scadastation.Station(5009997, Listbox);// scadastation 변전소
}
function Listbox(_station)//사용자 보기 리스트 박스 생성
{
    g_station=_station;
    faultlogic.SelectLogic(function(_logicname)
    {
      g_faultlogic = _logicname.rows;
      create_userview = list_createlistbox.Createview(g_area, g_reason, g_station, g_faultlogic);
      g_userview=ejs.render(g_userview_listbox,
      {
       listbox:create_userview
      });
 });
}



module.exports={
  UserinfoAllUser,
  UserinfoAreaUser,
  UserinfoLogicUser,
  Area,
  Reason,
  Station,
  Listbox,
}
