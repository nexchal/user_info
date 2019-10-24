var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');
var bodyParser= require('body-parser');

var listcontrol = require('./controls/listcontrol.js');
var insertuser = require('./controls/insertuser.js');
var updatecontrol = require('./controls/updatecontrol.js');
//var add_fault = require('./models/add_fault.js');

//var delete_router = require('./models/delete.js');

app.set('view engine','ejs'); // ejs사용

//app.use('/',delete_router);

//app.use('/',cbrouter);
app.use('/',listcontrol);
app.use('/',insertuser);
app.use('/',updatecontrol);
//app.use('/',add_fault);
app.use(express.static('public'));  // 정적파일 사용하기

app.listen(3001, function() {
  console.log('Example app listening on port 3001!')
});
module.exports = app;
