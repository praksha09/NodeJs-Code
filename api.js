var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 


//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  database : 'mydatabase' //mysql database name
});
 
connection.connect(function(err) {
  if (err) throw err;
  console.log('You are now connected...');
});
//end mysql connection
 

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration
 
//create app server
var server = app.listen(3000,  "127.0.0.1", function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("Example app listening at http://%s:%s", host, port);
 
});
 
//rest api to get all results
app.get('/user', function (req, res) {
   connection.query('select * from users', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/user/:id', function (req, res) {
   console.log(req);
   connection.query('select * from users where id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/user', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/user', function (req, res) {
   connection.query('UPDATE `users` SET `firstname`=? where `id`=?', [req.body.firstname, req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/user', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `users` WHERE `id`=?', [req.body.id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});
