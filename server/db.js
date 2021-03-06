var mssql = require('mssql');

var db = {};
var config = {
  user: 'sa',
  password: '123456',
  server: 'localhost', 
  database: '邹智敏',
  port:1433,
  options: {
    encrypt: false // Use this if you're on Windows Azure
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000
  }
};
 
//执行sql,返回数据.
db.sql = function (sql, callBack) {
  console.log("sql", sql)
  var connection = new mssql.ConnectionPool(config, function (err) {
    if (err) {
      console.log(err);
      console.log("连接数据库失败");
      return;
    }
    var ps = new mssql.PreparedStatement(connection);
    ps.prepare(sql, function (err) {
      if (err){
        console.log(err);
        return;
      }
      ps.execute('', function (err, result) {
        if (err){
          console.log(err);
          return;
        }
 
        ps.unprepare(function (err) {
          if (err){
            console.log(err);
            callback(err,null);
            return;
          }
            callBack(err, result);
        });
      });
    });
  });
};
 
module.exports = db;