var fs = require('fs');
var ejs = require('ejs');
var express=require('express');
var bodyParser = require('body-parser'); //form 애서 넘어온 값 받아오기 위해 사용
var faultlogic = require('../models/faultlogic.js'); // 고장유형 목록 조회 모델
var userinfo = require('../models/userinfo.js'); // 사용자 정보 목록 조회 모델
var fault_list_create = require('../views/Fault_list_create.js'); // 고장유형 목록 체크박스로 생성하는 파일

var router = express.Router();
var delete_faultlogic = require('../models/delete_faultlogic.js'); // 고장유형 삭제,삽입 모델
var g_checked_num; // 사용자가 선택한 고장유형
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/page/:pageId',function(_req, _res) // 사용자 정보 상세보기
{
  var usernum = _req.params.pageId;
  return Html(_req, _res, usernum);
});

router.post('/insert',function(_req,_res)
{
  var post = _req.body;
  var ch_value = post.fault; // 채크된 고장유형 값
  var ch_count = post.checked; // 체크된 갯수
  var emp_id = post.emp_id; // 수정 될 사용자 id값
  var emp_num = "/page/" + post.title; // 이동할 페이지
  delete_faultlogic.Delete(_req, _res, ch_value, ch_count,emp_id, emp_num);
 });

	function Html(_req, _res, _usernum) // _usernum 은 메인 페이지에서 넘어온 값
	{
		faultlogic.SelectLogic(ShowList); // 고장유형 목록 검색
		userinfo.UserInfo(_usernum, _res, ShowUser); //선택 유저 정보 출력
	}

  function ShowList(_logic_list) // 고장 유형 리스트 검색 값을 가져온 뒤 Fault_lsit_create.js에서 체크박스 생성
  {
    g_fault_list = fault_list_create.FaultList(_logic_list.rows);
  }

  function ShowUser (_res, _result) //선택 유저 정보 출력
  {
    g_name = _result.rows[0][0];
    g_area = _result.rows[0][1];
    g_location = _result.rows[0][2];
    g_station = _result.rows[0][3];
    g_emp_id = _result.rows[0][4];
    g_emp_tel = _result.rows[0][5];
    g_emp_num = _result.rows[0][6];

    faultlogic.SelectId(g_emp_id, _res, ShowFault); // 선택유저가 가지고있는 고장목록
  }
  function ShowFault(_res, _logic_name)  // 선택유저가 가지고있는 고장목록, ejs로 전달
  {
    var arr_logic = new Array;            // db에서 가져온 값(_logic_name)이 fault 유형 id 번호 값과 이름을 동시에 가지고 있음
    var logic_number = _logic_name.rows;  //  id번호 와 이름 을 나누어 따로 저장하는 함수임
    var val_length;
    if(logic_number.length === 0)
    {
      val_length = 1 ;
      arr_logic = '';
      g_checked_num = arr_logic;
    }
    else
    {
      val_length = logic_number.length;
      for(var q = 0; q < val_length; q++)
      {
        arr_logic.push(logic_number[q][1]);
        g_checked_num = arr_logic;
      }
      console.log(g_checked_num);
    }
    _res.render('view_details',
    {
      id: g_emp_id, name : g_name, area : g_area, area1: g_location, station: g_station,
      title: g_emp_num, tel: g_emp_tel,                                      // 유저 정보 변수

      all_fault_list: g_fault_list, all_fault_length: g_fault_list.length,  //	전체 고장 목록,길이

      user_fault: _logic_name.rows, length: _logic_name.rows.length,
      hidden_check: g_checked_num, hidden_check_length : g_checked_num.length  // 유저가 선택한 고장유형 목록,길이
    });
  }
module.exports = router;
