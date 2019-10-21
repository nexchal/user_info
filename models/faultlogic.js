var oracledb=require('oracledb');
var dbConfig = require('./../config/dbconfig2.js');

module.exports = {

  LogicName: function(callback){

      var data='';
      oracledb.getConnection(dbConfig,
        function(err, conn)
      {
        conn.execute(`select logicname from faultlogic `, callback);
      });
    }
	,
  select_logic: function(_callback)
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`SELECT LOGICID, LOGICNAME FROM FAULTLOGIC`,function (err, logic)
      {
        _callback(logic);
      });
    });
  },

  select_id: function(_emp_id,_callback)  // 선택유저가 가지고있는 고장목록
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`select LOGICNAME,LOGICID from FAULTLOGIC where LOGICID in (select fault_logicid from test_err_type where id = ${_emp_id})`,function (err, logic_name)
      {
          _callback(logic_name);
      });
    });
  },
  }
