var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig2.js');

module.exports = {
	AreaSearch: function(pid, callback)
	{
		oracledb.getConnection(dbConfig,
			function(err, conn)
			{
		        if (err)
		        {
		              console.error(err.message);
		              throw err;
		        }
		        conn.execute(`select distinct centername from ( select centerid, substr(centerid,0,3) as rccid , substr(centerid, 4,3) as sccid ,centername from CONTROLCENTER )
                        where sccid = 0 `, function(err,result)
												{
													var area= result.rows;
													callback(area);
												});
			}
		);
	},

	Reason168: function(pid, callback)
	{
		oracledb.getConnection(dbConfig,
			function(err, conn)
			{
		        if (err)
		        {
		              console.error(err.message);
		              throw err;
		        }
		        conn.execute(`select centername from ( select centerid,substr(centerid,0,3) rccid , substr(centerid, 4,3) sccid ,centername from CONTROLCENTER )
													where rccid = 168 and sccid > 0`, function(err,result)
													{
														var reason = result.rows;
														callback(reason);
													});
			}
		);
},

Station: function(pid, callback)
{
	oracledb.getConnection(dbConfig,
		function(err, conn)
		{
			if (err)
			{
				console.error(err.message);
				throw err;
			}
			conn.execute(`select stationname from ( select ccid,substr(ccid,0,3) rccid ,stationname from SCADASTATION )
where rccid = 168 and rownum <= 30`, function(err,result)
			{
				var station= result.rows;
				callback(station);
			});
		}
	);
}
}
