var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var bodyParser = require('body-parser');
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var scadastation = require('../models/scadastation.js');//지역및 변젼소
var list_createlistbox = require('../views/list_createlistbox.js');//리스트박스 생성
oracledb.autoCommit = true;
var router = express.Router();

var g_insertform = fs.readFileSync(__dirname+'/../views/form.ejs', 'utf8');
var g_page; //response print page 변수
var g_data; //userlist 저장변수
var g_userview; //user listbox ejs
var g_area;   // listbox 지역
var g_reason; // listbox 구역
var g_station; //listbox 변전소

Area();
router.get('/insertuser',function(_req, _res)
{
   InsertUser(_res);
});


router.post('/create_process',function(_req, _res)
{
  var post = _req.body;
  var area = post.area;
  var reason = post.reason;
  var station = post.station;
  var new_name = post.name;
  var new_tel =  post.tel;
  var emp_no = post.emp_no;

  userinfo.Insert(emp_no, new_name, new_tel, area, reason, station, function(err)
  {
    _res.end(`<script>alert("추가 완료!", charset="utf-8");window.close()</script>`);
  });
});

function InsertUser(_res)
{
    page = ejs.render(g_insertform,
    {
      categorys:g_userview
    });

  _res.writeHead(200);
  _res.end(page);
}

function Area()
{
  scadastation.info(5009999,Reason);//scadastation 계통
}
function Reason(_area)
{
  g_area = _area;
  scadastation.info168(5009998,Station);//scadastation 구역
}
function Station(_reason)
{
  g_reason=_reason;
  scadastation.info_stname(5009997,CreateCategory);// scadastation 변전소
}
function CreateCategory(_station)
{
  g_station=_station;
  g_userview = list_createlistbox.CreateCategory(g_area, g_reason, g_station);
}

module.exports = router;
