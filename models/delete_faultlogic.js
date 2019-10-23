var ejs = require('ejs');
var oracledb=require('oracledb');
var express=require('express');
var dbConfig = require('./../config/dbconfig2.js');

oracledb.autoCommit = true;

module.exports =
{
	delete:function(_req, _res, ch_value, ch_count,emp_id, address)
  {
		console.log("개인별 수정");
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`delete from TEST_ERR_TYPE where id = ${emp_id}`, function (err, result)
      {
        if(ch_count === '1')
        {
          conn.execute(`insert into TEST_ERR_TYPE values(${ch_value},${emp_id})`, function (err, result0)
          {});
        }
        else
        {
          for(var i = 0; i < ch_count; i++)
          {
            conn.execute(`insert into TEST_ERR_TYPE values(${ch_value[i]},${emp_id})`, function (err, result1){});
          }
        }
      });
    });
		_res.writeHead(302, {Location: `${address}`});
		_res.end();
 	},

	multi_delete: function(_req, _res, _fault, _fault_count, _emp_count,_emp_id)
	{
		console.log("여러명 수정");
		oracledb.getConnection(dbConfig,function(err, conn)
    {
			if(_fault_count === '1')
			{
				for(var i = 0; i < _emp_id.length; i++)
				{
		      conn.execute(`delete from TEST_ERR_TYPE where id = ${_emp_id[i]}`, function (err, result)
		      { console.log("삭제"+result); });
				}
				for(var i = 0; i < _emp_id.length; i++)
				{
	      	conn.execute(`insert into TEST_ERR_TYPE values(${_fault},${_emp_id[i]})`, function (err, result0)
	      	{
	      		console.log("고장 1개 유저 여러명"+result0);
	      	});
	      }
			}
	    else
	    {
				for(var i = 0; i < _emp_id.length; i++)
				{
					conn.execute(`delete from TEST_ERR_TYPE where id = ${_emp_id[i]}`, function (err, result)
					{ console.log("삭제"+result); });
				}
	      for(var i = 0; i < _emp_id.length; i++)
	      {
					for(var j = 0; j < _fault_count; j++)
		      {
		      	conn.execute(`insert into TEST_ERR_TYPE values(${_fault[j]},${_emp_id[i]})`, function (err, result1)
		        {
		          console.log("고장 여러개 유저 여러명:"+result1);
		        });
	        }
				}
	    }
	  });
		_res.writeHead(302, {Location: "/"});
		_res.end();
	}
}
