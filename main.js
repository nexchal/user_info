var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');
var bodyParser= require('body-parser');

var listcontrol = require('./controls/listcontrol.js');
var insertuser = require('./controls/insertuser.js');
var updatecontrol = require('./controls/updatecontrol.js');
var user_infopage = require('./controls/user_infopage.js');


app.set('view engine','ejs'); // ejs사용




app.use('/',listcontrol);
app.use('/',user_infopage);
app.use('/',insertuser);
app.use('/',updatecontrol);

app.use(express.static('public'));  // 정적파일 사용하기

app.listen(3001, function() {
  console.log('Example app listening on port 3001!')
});
module.exports = app;
