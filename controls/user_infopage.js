var fs = require('fs');
var ejs = require('ejs');
var express=require('express');
var bodyParser = require('body-parser');
var faultlogic = require('../models/faultlogic.js');
var userinfo = require('../models/userinfo.js');
var router = express.Router();
var delete_faultlogic = require('../models/delete_faultlogic.js');
var checked_num; // 사용자가 선택한 고장유형

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/page/:pageId',function(_req, _res)
{
  var usernum = _req.params.pageId;
  console.log(usernum);

  return Html(_req, _res, usernum);
});

router.post('/insert',function(_req,_res)
{
  var post = _req.body;
  var ch_value = post.check; // 채크된 고장유형 값
  var ch_count = post.checked; // 체크된 갯수
  var emp_id = post.emp_id; // 수정 될 사용자 id값
  var emp_num = "/page/" + post.title; // 이동할 페이지

  console.log("값"+ch_value);
  console.log("체크된 갯수:"+ch_count);

  delete_faultlogic.delete(_req, _res, ch_value, ch_count,emp_id, emp_num);
 });

	function Html(_req, _res, _usernum) // _usernum 은 메인 페이지에서 넘어온 값
	{
		faultlogic.select_logic(ShowList); // 고장유형 목록 검색
		userinfo.user_info(_usernum, _res, ShowUser); //선택 유저 정보 출력
	}

  function ShowList(_logic_list) // 고장 유형 리스트 출력
  {
    g_fault_list = _logic_list.rows ;
  }

  function ShowUser (_res, _result) //선택 유저 정보 출력
  {
    console.log(_result.rows);
    g_name = _result.rows[0][0];
    g_area = _result.rows[0][1];
    g_location = _result.rows[0][2];
    g_station = _result.rows[0][3];
    g_emp_id = _result.rows[0][4];
    g_emp_tel = _result.rows[0][5];
    g_emp_num = _result.rows[0][6];

    faultlogic.select_id(g_emp_id, _res, ShowFault); // 선택유저가 가지고있는 고장목록
  }
  function ShowFault(_res, _logic_name)  // 선택유저가 가지고있는 고장목록
  {
    var arr_logic = new Array;
    var logic_number = _logic_name.rows;
    var val_length;
    if(logic_number.length === 0)
    {
      val_length = 1 ;
      arr_logic = '';
      checked_num = arr_logic;
    }
    else
    {
      val_length = logic_number.length;
      for(var q = 0; q < val_length; q++)
      {
        arr_logic.push(logic_number[q][1]);
        checked_num = arr_logic;
      }
    }

    _res.render('title',
    {
      id: g_emp_id, name : g_name, area : g_area, area1: g_location, station: g_station,
      title: g_emp_num, tel: g_emp_tel,                                       // 유저 정보
      all_fault_list: g_fault_list, all_fault_length: g_fault_list.length,  //	전체 고장 목록
      user_fault: _logic_name.rows, length: _logic_name.rows.length,
      checked: checked_num, checked_length : checked_num.length  // 유저 선택 고장 유형
    });
  }
module.exports = router;
