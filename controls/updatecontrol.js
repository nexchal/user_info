/***********************                유형 수정 페이지 컨트롤  파일            ***********************/

var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var faultlogic = require('../models/faultlogic.js');//고장판단로직 모듈
var userinfo = require('../models/userinfo.js');//userinfo 모듈
var list_userinfolist = require('../views/list_userinfolist.js');//유저리스트 테이블화 모듈
var list_function = require(__dirname+'/listcontrol_function.js');//유저 리스트 출력 함수js
var fault_list_create = require('../views/Fault_list_create.js');//유저리스트 테이블화
var bodyParser = require('body-parser');

oracledb.autoCommit = true;
var router = express.Router();
//페이지 불러오기
var g_src = fs.readFileSync(__dirname+'/../views/updatepage.ejs', 'utf8');//main frame
var g_src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');//top frame
var g_src_body = fs.readFileSync(__dirname+'/../views/frame_body.ejs', 'utf8');//body frame
var g_src_bottom = fs.readFileSync(__dirname+'/../views/frame_bottom.ejs', 'utf8');//bottom frame
var g_controls=fs.readFileSync(__dirname+'/../views/update_button.ejs','utf8');//목록, 수정, 전체선택 버튼 ejs
var g_name = fs.readFileSync(__dirname+'/../views/list_column.ejs','utf8');//user column name
var g_page; //response print page 변수
var g_data; //userlist 저장변수
var g_checked;
faultlogic.SelectLogic(ShowFault); //FaultLogic list 호출

router.post('/update_process',function(_req, _res)// 수정 실행
{
  console.log("----------update_process!!-----------");
  var post = _req.body;
  var emp_id = post.id; //선택한 유저 id
  var fault = post.fault; // 선택한 고장판단 로직
  var fault_count = post.checked; // 선택한 고장로직의 수

 // 선택된 emp_id 의 값 받아와야함

  var db = require('../models/delete_faultlogic.js'); //고장판단로직 삭제 모듈
  db.MultiDelete(_req, _res, fault, fault_count,emp_id) //유저 id를 넘겨주어 고장판단로직 삭제 및 수정
});

router.post('/update',function(_req, _res)// 수정 페이지
{
  console.log("update!!");
  res = _res;
  post = _req.body;
  id = post.id
  peo = id.length
  console.log(peo);
  checked = post.checked;//체크된 유저 수
  faultlogic.MultiSelectId(id, MultiChecked); //선택된 유저들의 고장판단로직ID 목록 select 해서 콜백
});
function MultiChecked(_number) //고장판단로직 ID를 받아서 전역변수에 삽입
{
  g_checked = _number;
  g_checked_length = _number.length;
  SelectUserlist(checked, id, res); //체크된 유저 리스트 목록불러오기
}

function ShowFault(_logic_list) // 고장 유형 리스트 출력
{
  g_fault_list2 = fault_list_create.FaultList(_logic_list.rows);
}

function SelectUserlist(_checked, _id, _res,)// 유저리스트, 고장판단로직 리스트 출력
{
  userinfo.SelectUser(_checked, _id, function(err,result)
  {
    g_data = list_userinfolist.UpdateUserinfoCreatelist(result.rows);
    bodydata = ejs.render(g_src_body,
    {
      userview: `<input type = "hidden" value = ${peo} name = "count_emp" > `,
      search:'',
      dbname: g_name, //데이터 명
      dbdata: g_data, // 데이터
      fault_list: g_fault_list2, //전체 고장판단로직 리스트
      hidden_check: g_checked,
      hidden_check_length: g_checked.length,
      controls : g_controls
    });
    g_page = ejs.render(g_src,
    {
      frame_top: g_src_top,
      frame_body: bodydata,
      frame_bottom: '',

    });
    _res.writeHead(200);
    _res.end(g_page);
  });
}

module.exports = router;
