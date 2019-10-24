var g_fs = require('fs');
var g_ejs = require('ejs');
var g_express=require('express');
var checked_num; // 사용자가 선택한 고장유형
module.exports =
{
	Html:function(_req, _res, _usernum) // _usernum 은 메인 페이지에서 넘어온 값
	{
    var fault_db = require('../models/faultlogic.js');
    var user_db = require('../models/userinfo.js');

		function ShowList(_logic_list) // 고장 유형 리스트 출력
		{
			g_fault_list = _logic_list.rows ;
		}

		function ShowUser (_result) //선택 유저 정보 출력
		{
			g_name = _result.rows[0][0];
			g_area = _result.rows[0][1];
			g_location = _result.rows[0][2];
			g_station = _result.rows[0][3];
			g_emp_id = _result.rows[0][4];
			g_emp_tel = _result.rows[0][5];
			g_emp_num = _result.rows[0][6];

			fault_db.select_id(g_emp_id, ShowFault); // 선택유저가 가지고있는 고장목록
		}

		function ShowFault(_logic_name)  // 선택유저가 가지고있는 고장목록
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

		fault_db.select_logic(ShowList); // 고장유형 목록 검색
		user_db.user_info(_usernum, ShowUser); //선택 유저 정보 출력
	}
}
