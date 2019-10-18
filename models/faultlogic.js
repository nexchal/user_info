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
  }
