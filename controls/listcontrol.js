/***********************                메인 페이지 컨트롤 파일            ***********************/

var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var list_function = require(__dirname+'/listcontrol_function.js');//메인 페이지 리스트 출력 함수js
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
  switch (view)
  {
    case '0': //default
        list_function.UserinfoAllUser(_res);
        break;
    case 'all': //모든 유저 리스트 출력
        list_function.UserinfoAllUser(_res);
        break;
    case 'area': //지역별 유저 리스트 출력
      list_function.UserinfoAreaUser(_res, area, reason, station);
      break;
    case 'logic': //고장판단로직별 유저 리스트 출력
      list_function.UserinfoLogicUser(_res, logic);
      break;
  }

});

router.post('/user_delete',function(_req,_res)//선택 유저리스트 삭제
{
  var post = _req.body;
  var id = post.id;//유저의 id
  var checked = post.checked;//유저가 체크된 개수
  userinfo.UserDelete(id , checked, function(err, result)//userinfo db모듈로 유저 리스트 삭제
  {
    if(err)
    {
      throw err;
    }
    _res.end(`<script>location.href="/"</script>`);
  });
});



module.exports = router;
