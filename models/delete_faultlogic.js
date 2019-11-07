
/***********************                User의 FaultLogic 리스트 모듈            ***********************/

var ejs = require('ejs');
var oracledb=require('oracledb');
var express=require('express');
var dbConfig = require('./../config/dbconfig2.js');
oracledb.autoCommit = true;

module.exports =
{
	Delete:function(_req, _res, ch_value, ch_count,emp_id, address) //단일 유저의 FaultLogic 수정
  {
		console.log("개인별 수정");
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`delete from USER_FAULT_TYPE where id = ${emp_id}`, function (err, result) //유저의 모든 FaultLogic 삭제
      {
        if(ch_count === '1')	//추가할 Faultlogic이 1개이면
        {
          conn.execute(`insert into USER_FAULT_TYPE values(${ch_value},${emp_id})`, function (err, result0){}); //넘겨받은 FaultLogic과 유저ID를 DB에 추가
        }
        else //FaultLogic이 여러개이면
        {
          for(var i = 0; i < ch_count; i++) //FaultLogic의 개수 만큼 반복 실행
          {
            conn.execute(`insert into USER_FAULT_TYPE values(${ch_value[i]},${emp_id})`, function (err, result1){});
          }
        }
      });
    });
		_res.writeHead(302, {Location: `${address}`});
		_res.end();
 	},
/*
	MultiInsert: function()
	{
		for(var emc = 0; emc < _emp_id.length; emc++)
		{
			for(var fc = 0; fc < fault.length; fc++)
			conn.excute(`insert into TEST_ERR_TYPE values(${_fault[fc]},${_emp_id[em]})`,function(err, result)
			{
					console.log(result);
			});
		}
	},
*/
	MultiDelete: function(_req, _res, _fault, _fault_count,_emp_id)// 다중 유저의 FaultLogic 수정
	{
		console.log("여러명 수정");
		console.log(_fault_count);
		oracledb.getConnection(dbConfig,function(err, conn)
    {
			if(_fault_count === '1') //FaultLogic 수가 1개이면
			{
				for(var i = 0; i < _emp_id.length; i++)
				{
		      conn.execute(`delete from USER_FAULT_TYPE where id = ${_emp_id[i]}`, function (err, result) //넘겨받은 유저들의 ID에 추가되어 있는 FaultLogic 삭제
		      { console.log("삭제"+result); });
				}
				for(var i = 0; i < _emp_id.length; i++)
				{
	      	conn.execute(`insert into USER_FAULT_TYPE values(${_fault},${_emp_id[i]})`, function (err, result0)//다중유저의 ID와 FaultLogic을 DB에 반복 추가
	      	{
	      		console.log("고장 1개 유저 여러명"+result0);
	      	});
	      }
			}
	    else //FaultLogic 수가 여러개 이면
	    {
				for(var i = 0; i < _emp_id.length; i++)
				{
					conn.execute(`delete from USER_FAULT_TYPE where id = ${_emp_id[i]}`, function (err, result) //넘겨받은 유저들의 ID에 추가되어 있는 FaultLogic 삭제
					{ console.log("삭제"+result); });
				}

				for(var i = 0; i < _emp_id.length; i++)
	      {
					for(var j = 0; j < _fault_count; j++)
		      {
						conn.execute(`BEGIN test_jw(${_emp_id[i]},${_fault[j]}); END;`);
					}
				}
				/* for(var i = 0; i < _emp_id.length; i++)
				{
					conn.execute(`delete from USER_FAULT_TYPE where id = ${_emp_id[i]}`, function (err, result)
					{ console.log("삭제"+result); });
				}*/
				/*
	      for(var i = 0; i < _emp_id.length; i++)
	      {
					for(var j = 0; j < _fault_count; j++)
		      {
						conn.execute(`exec test_jw(${_fault[j]},${_emp_id[i]})`, function (err, result1)
						{
							console.log(result1);
						});
					}
				}*/
					 	/*conn.execute(`insert into USER_FAULT_TYPE values(${_fault[j]},${_emp_id[i]})`, function (err, result1)
		        {
		          console.log("고장 여러개 유저 여러명:"+result1);
		        });*/
	    }
	  });
		_res.writeHead(302, {Location: "/"});
		_res.end();
	},
}
