var ejs = require('ejs');
var oracledb=require('oracledb');
var express=require('express');
var dbConfig = require('./../config/dbconfig2.js');

oracledb.autoCommit = true;

module.exports =
{
	delete:function(_req, _res, ch_value, ch_count,emp_id, emp_num)
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`delete from TEST_ERR_TYPE where id = ${emp_id}`, function (err, result)
      {
        if(ch_count === '1')
        {
          conn.execute(`insert into TEST_ERR_TYPE values(${ch_value},${emp_id})`, function (err, result0)
          {
            console.log("한글자짜리"+result0);
          });
        }
        else
        {
          for(var i = 0; i < ch_count; i++)
          {
            conn.execute(`insert into TEST_ERR_TYPE values(${ch_value[i]},${emp_id})`, function (err, result1)
            {
              console.log("여러자리:"+result1);
            });
          }
        }
      });
    });
	_res.writeHead(302, {Location: `/page/${emp_num}`});
	 _res.end();
  }
}
