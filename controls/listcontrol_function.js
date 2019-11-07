/***********************                메인 페이지 컨트롤 함수 파일            ***********************/

var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var scadastation = require('../models/scadastation.js');//지역, 구역, 변전소에 대한 db모듈
var faultlogic = require('../models/faultlogic.js');//고장판단로직 db모듈
var userinfo = require('../models/userinfo.js');//userinfo db모듈
var list_createlistbox = require('../views/list_createlistbox.js');//리스트박스 생성 모듈
var list_userinfolist = require('../views/list_userinfolist.js');//유저리스트 테이블화 모듈
oracledb.autoCommit = true;
//페이지 불러오기
var g_src = fs.readFileSync(__dirname+'/../views/frame_main.ejs', 'utf8');//main frame
var g_src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');//top frame
var g_src_body = fs.readFileSync(__dirname+'/../views/frame_body.ejs', 'utf8');//body frame
var g_src_bottom = fs.readFileSync(__dirname+'/../views/frame_bottom.ejs', 'utf8');//bottom frame
var g_controls=fs.readFileSync(__dirname+'/../views/list_button.ejs','utf8');//컨트롤 버튼 ejs
var g_userview_listbox = fs.readFileSync(__dirname+'/../views/list_listboxfunction.ejs','utf8');//리스트박스 ejs
var g_name = fs.readFileSync(__dirname+'/../views/list_column.ejs','utf8');//user data column name
var g_search = fs.readFileSync(__dirname+'/../views/list_search.ejs','utf8');//유저 검색 ejs
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
        userview: g_userview, //유저 고장판단로직별, 지역별 보기 리스트박스
        search:g_search,  //유저 검색 모듈
        dbname: g_name, // 유저 리스트 항목 이름
        dbdata: g_data, //유저리스트
        controls: g_controls,
        fault_list:'',
        hidden_check: '',
        hidden_check_length: ''
      });
      g_page = ejs.render(g_src,
      {
        frame_top: g_src_top, //상단바
        frame_body: bodydata, //바디 내용
        frame_bottom:'', //삭제, 수정, 추가 버튼
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
          userview: g_userview, //유저 고장판단로직별, 지역별 보기 리스트박스
          search:g_search, //유저 검색 모듈
          dbname: g_name, // 유저 리스트 항목 이름
          dbdata: g_data, //유저리스트
          controls: g_controls,
          fault_list:'',
          hidden_check: '',
          hidden_check_length: ''
        });
        g_page = ejs.render(g_src,
        {
          frame_top: g_src_top, //상단바
          frame_body: bodydata, //바디 내용
          frame_bottom:'', //삭제, 수정, 추가 버튼

        });

      _res.writeHead(200);
      _res.end(g_page);
    });
}

function UserinfoAreaUser(_res, _area, _reason, _station)//지역관련 유저리스트 생성
{
    userinfo.UserArea(_area, _reason, _station, function(err, list)
    {
      var count;
      var bodydata;

      g_data = list_userinfolist.UserinfoCreatelist(list.rows);

      var bodydata = ejs.render(g_src_body,
      {
        userview: g_userview, //유저 고장판단로직별, 지역별 보기 리스트박스
        search:g_search, //유저 검색 모듈
        dbname: g_name, // 유저 리스트 항목 이름
        dbdata: g_data, //유저리스트
        controls: g_controls,
        fault_list:'',
        hidden_check: '',
        hidden_check_length: ''
      });
      g_page = ejs.render(g_src,
      {
        frame_top: g_src_top, //상단바
        frame_body: bodydata, //바디 내용
        frame_bottom:'', //삭제, 수정, 추가 버튼
      });

      _res.writeHead(200);
      _res.end(g_page);
    });
}

function Area()
{
  scadastation.AreaSearch(5009999,Reason);//scadastation db 모듈에서 지역 select하여 Reason 함수를 콜백
}
function Reason(_area)
{
  g_area = _area;
  scadastation.	Reason168(5009998,Station);//scadastation db 모듈에서  구역 select하여 Station 함수를 콜백
}
function Station(_reason)
{
  g_reason=_reason;
  scadastation.Station(5009997, Listbox);// scadastation db 모듈에서 변전소 select 하여 CreateCategory 함수를 콜백
}
function Listbox(_station)//사용자 보기 리스트 박스 생성
{
    g_station=_station;//변전소 정보 받아서 전역변수에 삽입
    faultlogic.SelectLogic(function(_logicname) //고장판단 로직 리스트를 호출해 리스트박스 생성
    {
      g_faultlogic = _logicname.rows;
      create_userview = list_createlistbox.Createview(g_area, g_reason, g_station, g_faultlogic);
      g_userview = ejs.render(g_userview_listbox,
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
