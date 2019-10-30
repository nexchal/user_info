/***********************                유저 추가 페이지 컨트롤 파일            ***********************/

var express = require('express');//express 모듈
var fs = require('fs');//fs 파일시스템 모듈
var ejs = require('ejs');//ejs 모듈
var oracledb = require('oracledb'); // oracledb
var bodyParser = require('body-parser');
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var scadastation = require('../models/scadastation.js');//지역및 변젼소
var list_createlistbox = require('../views/list_createlistbox.js');//리스트박스 생성
oracledb.autoCommit = true;
var router = express.Router();

var g_insertform = fs.readFileSync(__dirname+'/../views/form.ejs', 'utf8');// 유저 추가 페이지 ejs
var g_page; //response print page 변수
var g_data; //userlist 저장변수
var g_userview; //user listbox ejs
var g_area;   // listbox 지역
var g_reason; // listbox 구역
var g_station; //listbox 변전소

Area();// 지역, 구역, 변전소 리스트박스생성

router.get('/insertuser',function(_req, _res)//유저 추가 페이지 출력하기위해 함수호출
{
   InsertUser(_res);
});


router.post('/create_process',function(_req, _res)//유저 추가 시 실행코드
{
  var post = _req.body;
  var area = post.area;
  var reason = post.reason;
  var station = post.station;
  var new_name = post.name;//유저 이름
  var new_tel =  post.tel;//유저 전화번호
  var emp_no = post.emp_no;//유저 사원번호

  userinfo.Insert(emp_no, new_name, new_tel, area, reason, station, function(err)//userinfo 테이블에 유저 추가 실행 함수
  {

    _res.end(`<script>opener.parent.location.reload(true);alert("create sucess!");window.close()</script>`);//alert창 띄우고 부모페이지 새로고침, 윈도우 종료
  });
});

function InsertUser(_res)//유저 추가 폼 호출함수
{
    page = ejs.render(g_insertform,//Area() 함수를 통해 지역, 구역, 변전소 리스트박스를 유저 추가 페이지에 렌더링
    {
      categorys:g_userview
    });

  _res.writeHead(200);
  _res.end(page);
}

function Area()//지역, 구역, 변전소 리스트박스 생성 함수
{
  scadastation.AreaSearch(5009999,Reason);//scadastation db 모듈에서 지역 select하여 Reason 함수에 콜백
}
function Reason(_area)
{
  g_area = _area;
  scadastation.Reason168(5009998,Station);//scadastation db 모듈에서  구역 select하여 Station 함수에 콜백
}
function Station(_reason) //scadastation db 모듈에서
{
  g_reason=_reason;
  scadastation.Station(5009997,CreateCategory);// scadastation 변전소
}
function CreateCategory(_station)
{
  g_station=_station;
  g_userview = list_createlistbox.CreateCategory(g_area, g_reason, g_station);
}

module.exports = router;
