var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var faultlogic = require('../models/faultlogic.js');//고장판단로직
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var list_userinfolist = require('../views/list_userinfolist.js');//유저리스트 테이블화
var list_function = require(__dirname+'/listcontrol_function.js');//리스트 출력 함수js
var bodyParser = require('body-parser');

oracledb.autoCommit = true;
var router = express.Router();
//페이지 불러오기
var g_src = fs.readFileSync(__dirname+'/../views/frame_main.ejs', 'utf8');//main frame
var g_src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');//top frame
var g_src_body = fs.readFileSync(__dirname+'/../views/frame_body.ejs', 'utf8');//body frame
var g_src_bottom = fs.readFileSync(__dirname+'/../views/frame_bottom.ejs', 'utf8');//bottom frame
var g_controls=fs.readFileSync(__dirname+'/../views/update_button.ejs','utf8');//컨트롤 버튼 ejs
var g_name = fs.readFileSync(__dirname+'/../views/list_column.ejs','utf8');//user column name
var button = fs.readFileSync(__dirname+'/../views/update_button.ejs')
var g_page; //response print page 변수
var g_data; //userlist 저장변수

router.post('/update',function(_req, _res)
{
  var post = _req.body;

  var check = post.check;//유저의 핸드폰정보
  var checked = post.checked;//체크된 유저 수

  SelectUserlist(checked, check, _res);//유저 리스트 출력

});

function SelectUserlist(_checked, _check, _res)
{
  userinfo.SelectUser(_checked, _check, function(err,result)
  {
    g_data = list_userinfolist.UserinfoCreatelist(result.rows);
    bodydata = ejs.render(g_src_body,
    {
      userview: '',
      dbname: g_name,
      dbdata: g_data,
    });
    g_page = ejs.render(g_src,
    {
      frame_top: g_src_top,
      frame_body: bodydata,
      frame_bottom: button
    });
    _res.writeHead(200);
    _res.end(g_page);
  });
}

function FaultLogic()
{
  faultlogic.LogicName(function(err,result)
  {

  });
}
module.exports = router;
