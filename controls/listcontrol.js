/***********************                메인 페이지 컨트롤 파일            ***********************/
var fs = require('fs');
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var userinfo = require('../models/userinfo.js');//userinfo 테이블
var list_function = require(__dirname+'/listcontrol_function.js');//메인 페이지 리스트 출력 함수js
var list_userinfolist = require('../views/list_userinfolist.js');//유저리스트
var g_searchpage = fs.readFileSync(__dirname+'/../views/usersearch.ejs','utf-8');
var router = express.Router();
var g_data;
router.use(bodyParser.urlencoded({ extended: false }));

list_function.Area();//리스트박스 생성

router.get('/',function(_req, _res) //메인 페이지 유저 리스트 출력
{
  console.log("main !");
  list_function.UserinfoAllUser(_res);
});

router.post('/',function(_req, _res) //메인 페이지 유저 검색리스트 출력
{
  var post = _req.body;
  var view = post.view;
  var area = post.area;
  var reason = post.reason;
  var station = post.station;
  var logic = post.logic;
  switch (view)
  {
    case 'default': //default
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

router.post('/user_delete',function(_req, _res)//선택 유저리스트 삭제
{
  var post = _req.body;
  var id = post.id;//유저의 id
  var checked = post.checked;//유저가 체크된 개수
  userinfo.UserDelete(id , checked, function(result)//userinfo db모듈로 유저 리스트 삭제
  {
    _res.end(`<script>location.href="/"</script>`);
  });
});

router.get('/searchuser',function(_req, _res)//유저 검색 팝업창
{
  g_page = g_searchpage;
  _res.writeHead(200);
  _res.end(g_page);
});

router.post('/searchuseraction',function(_req, _res)//유저 검색 출력
{
  var post = _req.body;
  var name = post.username;
  var tel = post.usertel;
  var scase ='';
  console.log(`name : `+name);
  console.log(`tel : `+tel);
  if(name === '')
  {
    scase+='tel';
    userinfo.Search(scase, name, tel, SearchPrint);
  }
  else if(tel === '')
  {
    scase+='name';
    userinfo.Search(scase, name, tel, SearchPrint);
  }
  else
  {
    scase+='nametel';
    userinfo.Search(scase, name, tel, SearchPrint);
  }
});

router.post('/Mailsubmit',function(_req, _res)//유저 검색 출력
{
    var post = _req.body;
    var title = post.title;
    var description = post.description;
    console.log()
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport(
    {
      service:'gmail',
      auth:
      {
          user : 'joamoon7@gmail.com',
          pass : 'enahrspt1!'
      }
    });

    var mailOption =
    {
        from : 'joamoon7@gmail.com',
        to : 'sprjsem1@gmail.com',
        subject : 'test',
        text : 'Hello'
    };

    transporter.sendMail(mailOption, function(err, info)
    {
        if ( err )
        {
            console.error('Send Mail error : ', err);
        }
        else
        {
            console.log('Message sent : ', info);
        }
    });
});
function SearchPrint(_user)
{
  g_data = list_userinfolist.UserinfoCreatelist(_user.rows);
  var page = fs.readFileSync(__dirname+'/../views/frame_body.ejs','utf8');
  page = ejs.render(page, {
    userview: g_userview, //유저 고장판단로직별, 지역별 보기 리스트박스
    search:g_search,  //유저 검색 모듈
    dbname: g_name, // 유저 리스트 항목 이름
    dbdata: g_data, //유저리스트
    controls: g_controls,
    fault_list:'',
    hidden_check: '',
    hidden_check_length: ''
  });
  _res.writeHead(200);
  _res.end(page);
}


module.exports = router;
