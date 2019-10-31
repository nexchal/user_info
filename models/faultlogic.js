/***********************               FaultLogic 리스트 모듈            ***********************/

var oracledb=require('oracledb');
var dbConfig = require('./../config/dbconfig2.js');
oracledb.autoCommit = true;
module.exports = {
  SelectLogic: function(_callback) //FaultLogic ID, Name Select
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`SELECT LOGICID, LOGICNAME FROM FAULTLOGIC`,function (err, logic)
      {
        _callback(logic);
      });
    });
  },

  SelectId: function(_emp_id, _res, _callback)  // 선택유저가 가지고있는 고장목록 Select
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`select LOGICNAME,LOGICID from FAULTLOGIC where LOGICID in (select fault_logicid from test_err_type where id = ${_emp_id})`,function (err, logic_name)
      {
          _callback(_res, logic_name);
      });
    });
  },

  MultiSelectId: function(_emp_id, _callback)  // 다중 선택유저가 가지고있는 고장목록 Select
  {
    console.log("다중 검색 도착");
    var fault_number = "";
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      str = "select FAULT_LOGICID FROM test_err_type where ";
      for(var i = 0; i<_emp_id.length; i++)
      {
        str = str + " id = "+ _emp_id[i] ;
        if( i == _emp_id.length-1)
        {
          continue;
        }
        str = str + " or";
      }
        conn.execute(str,function (err, logic_name)
        {
          _callback(logic_name.rows);
        });
      });
    }
  }
