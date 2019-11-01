var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var faultlogic = require('../models/faultlogic.js');//고장판단로직
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var list_userinfolist = require('../views/list_userinfolist.js');//유저리스트 테이블화
var list_function = require(__dirname+'/listcontrol_function.js');//리스트 출력 함수js
var fault_list_create = require('../views/Fault_list_create.js');//유저리스트 테이블화
var bodyParser = require('body-parser');

oracledb.autoCommit = true;
var router = express.Router();
//페이지 불러오기
var g_src = fs.readFileSync(__dirname+'/../views/updatepage.ejs', 'utf8');//main frame
var g_src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');//top frame
var g_src_body = fs.readFileSync(__dirname+'/../views/frame_body.ejs', 'utf8');//body frame
var g_src_bottom = fs.readFileSync(__dirname+'/../views/frame_bottom.ejs', 'utf8');//bottom frame
var g_controls=fs.readFileSync(__dirname+'/../views/update_button.ejs','utf8');//컨트롤 버튼 ejs
var g_name = fs.readFileSync(__dirname+'/../views/list_column.ejs','utf8');//user column name
var button = fs.readFileSync(__dirname+'/../views/update_button.ejs')
var g_page; //response print page 변수
var g_data; //userlist 저장변수
var g_checked;
faultlogic.SelectLogic(ShowFault);

router.post('/update_process',function(_req, _res)
{
  console.log("----------update_process!!-----------");
  var post = _req.body;
  var emp_id = post.id;
  var fault = post.fault;
  var emp_count = post.checked;

 // 선택된 emp_id 의 값 받아와야함

  var db = require('../models/delete_faultlogic.js');
  db.MultiDelete(_req, _res, fault, emp_count,emp_id)
});

router.post('/update',function(_req, _res)
{
  console.log("update!!");
  res = _res;
  post = _req.body;
  id = post.id
  peo = id.length
  console.log(peo);
  checked = post.checked;//체크된 유저 수
  faultlogic.MultiSelectId(id,MultiChecked);
});
function MultiChecked(_number)
{
  g_checked = _number;
  g_checked_length = _number.lengthl
  SelectUserlist(checked, id, res)
}

function ShowFault(_logic_list) // 고장 유형 리스트 출력
{
  g_fault_list2 = fault_list_create.FaultList(_logic_list.rows);
}

function SelectUserlist(_checked, _id, _res,)
{
  userinfo.SelectUser(_checked, _id, function(err,result)
  {
    g_data = list_userinfolist.UpdateUserinfoCreatelist(result.rows);
    bodydata = ejs.render(g_src_body,
    {
      userview: `<input type = "text" value = ${peo}> `,
      search:'',
      dbname: g_name,
      dbdata: g_data,
      fault_list: g_fault_list2,
      hidden_check: g_checked,
      hidden_check_length: g_checked.length,
      controls : button
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
