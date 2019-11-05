/***********************               UserInfo 리스트 모듈            ***********************/
var oracledb=require('oracledb');
var dbConfig = require('./../config/dbconfig2.js');
var scadastation = require('../models/scadastation.js');//지역및 변젼소
var faultlogic = require('../models/faultlogic.js');//고장판단로직
oracledb.autoCommit = true;
module.exports = {

  AllUser: function(_pid, _userlist) //All User info Select
  {
    var data='';
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
       station as 변전소, id FROM test_userinfo order by id desc`,_userlist);
    });
  },
  UserInfo: function(_usernum, _res, _callback) //SelectUser info Select
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`SELECT emp_name,area,reason,station,id,emp_tel,emp_no FROM test_userinfo where emp_no = '${_usernum}'`,  function (err, result)
      {
        _callback(_res, result);
      });
    });
  },

  UserLogic : function(_logic, _userlist) //FaultLogic Search
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
       station as 변전소, id FROM test_userinfo where id in (select id from test_err_type where fault_logicid=(select logicid from faultlogic where logicname='${_logic}'))`,_userlist);
    });
  },
  UserArea: function(_area, _reason, _station, _userlist) //Area Search
  {
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      console.log(`지역`+_area);
      console.log(`구역`+_reason);
      console.log(`변전소`+_station);

        console.log(`DB모듈 동작`);
        if(_station == '0') //Station not select
        {
          if(_reason == '0') //Station and Reason not select
          {
            console.log(`지역만선택`)
            conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
             station as 변전소, id FROM test_userinfo where area='${_area}'`,_userlist);
          }
          else if(_area =='0')//Station and Area not select
          {
            console.log(`구역 선택`);
            conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
             station as 변전소, id FROM test_userinfo where reason='${_reason}'`,_userlist);
          }
          else
          {
            console.log(`지역, 구역 선택`);
            conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
               station as 변전소, id FROM test_userinfo where area='${_area}' and reason='${_reason}'`,_userlist);
          }
        }
        else if(_reason == '0' && _station != '0') // Station select
        {
          if(_area == '0')//Area and Reason not select
          {
            console.log(`변전소 선택`);
            conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
               station as 변전소, id FROM test_userinfo where station ='${_station}'`,_userlist);
          }
          else//Reason not select
          {
            console.log(`지역, 변전소 선택`);
            conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
               station as 변전소, id FROM test_userinfo where  area='${_area}' and station ='${_station}'`,_userlist);
          }
        }
        else
        {
          if(_area != '0') // All select
          {
            console.log(`지역, 구역, 변전소 선택`);
            conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
               station as 변전소, id FROM test_userinfo where area='${_area}' and reason='${_reason}' and station='${_station}'`,_userlist);
          }
          else // Reason and Station select
          {
            console.log(`구역, 변전소 선택`);
            conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, reason as 구역,
               station as 변전소, id FROM test_userinfo where reason='${_reason}' and station='${_station}'`,_userlist);
          }
        }
    });
  },
  UserDelete: function(_id, _checked ,_callback) //User Delete
  {
    console.log(`유저 삭제`+_id);
    console.log(`유저수`+_checked);
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      if(_checked == 1) //Single User Delete
      {
          conn.execute(`delete from test_userinfo where id='${_id}' `,_callback);
      }
      else //Multi User Delete
      {
        for(var i=0; i< _id.length; i++)
        {
            conn.execute(`delete from test_userinfo where id='${_id[i]}'`, _callback);
        }
      }
    });
  },
  SelectUser:function(_checked, _id, _userlist)           // 다중 선택 유저
  {
    console.log(`선택유저`+_id);
    oracledb.getConnection(dbConfig,function(err, conn)
    {
      if(_checked ==1)
      {
        console.log(`단일 유저`+_id);
        conn.execute(`select * from test_userinfo where id='${_id}' `,_userlist);
      }
      else
      {
        console.log(`다중 유저`);
        var sqlquery='';
        for(var i=0; i < _checked; i++)
        {
          if(i+1 == _checked)
          {
            sqlquery +=`'${_id[i]}'`
          }
          else
          {
            sqlquery +=`'${_id[i]}' or id=`
          }

        }
          conn.execute(`select * from test_userinfo where id=${sqlquery} `,_userlist);
        }
    });
  },
  Insert:function(_emp_no, _new_name, _new_tel, _area, _reason, _station, callback){
			var oracledb = require('oracledb');
			var dbConfig = require('./../config/dbconfig2.js');
      oracledb.getConnection(dbConfig,function(err, conn)
      {
        conn.execute(`select emp_no from test_userinfo where emp_tel='${_new_tel}'`, function(err, result)
      {
        if(result.rows == '')
        {
          console.log(`추가`+result);
          conn.execute(`insert into test_userinfo VALUES ('${_emp_no}','${_new_name}','${_new_tel}','${_area}','${_reason}','${_station}',tmp_seq.NEXTVAL)`, callback);
        }
        else
        {
          console.log(`입력 전화번호`+_new_tel);
          console.log(`중복`+result);
          callback(`overlap`);
        }
      });

      });
    },
}
