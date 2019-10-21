var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var list_function = require(__dirname+'/listcontrol_function.js');//리스트 출력 함수js
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

list_function.Area();//리스트박스 생성

router.get('/',function(_req, _res) //메인 페이지 유저 리스트 출력
{
  //userinfo_alluser_print();
  console.log("main !");
  list_function.UserinfoAllUser(_res);
});

router.post('/',function(_req, _res) //메인 페이지 유저 검색리스트 출력
{
  var post = _req.body;
  var view = post.view;
  var area = post.area;
  var reason = post.area1;
  var station = post.station;
  var logic = post.logic;
  console.log(view);
  switch (view)
  {
    case '0':
        list_function.UserinfoAllUser(_res);
        break;
    case 'all':
        list_function.UserinfoAllUser(_res);
        break;
    case 'area':
      console.log(`지역 검색`);
      list_function.UserinfoAreaUser(_res, area, reason, station);
      break;
    case 'logic':
      console.log(`로직 검색`);
      list_function.UserinfoLogicUser(_res, logic);
      break;
  }

});

router.post('/user_delete',function(_req,_res)//체크박스 삭제
{
  var post = _req.body;
  var check = post.check;
  userinfo.UserDelete(check ,function(err, result)
  {
    if(err)
    {
      console.error(err.message);
      throw err;
    }
    console.log(result);
    _res.writeHead(302, {Location: `/`});
    _res.end();
  });
});


router.get('/page/:pageId',function(req, res)
{
  var usernum = req.params.pageId;
  console.log(usernum);
  page = require('../controls/user_infopage.js');
  return page.Html(req,res,usernum);
});


router.post('/insert',function(_req,_res)
{
  var post = _req.body;
  var ch_value = post.check; // 채크된 고장유형 값
  var ch_count = post.checked; // 체크된 갯수
  var emp_id = post.emp_id; // 수정 될 사용자 id값
  var emp_num = post.title; // 이동할 페이지

  console.log("값"+ch_value);
  console.log("체크된 갯수:"+ch_count);

  var db = require('../models/delete_userinfo.js');
  db.delete(_req, _res, ch_value, ch_count,emp_id, emp_num);
 });








module.exports = router;
