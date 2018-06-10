var http = require("http");
var app = require('express')();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  database : 'project' //mysql database name
});
 
connection.connect(function(err) {
  if (err) throw err;
  console.log('You are now connected...');
});

 module.exports=connection;


