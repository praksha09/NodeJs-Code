var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 
var connection=require('./conn.js');
//rest api to get all results
app.get('/login', function (req, res) {
   connection.query('select * from sign_up', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/login/:email', function (req, res) {
   console.log(req);
   connection.query('select * from sign_up where email=?', [req.params.email], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/login', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO sign_up SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/login', function (req, res) {
   connection.query('UPDATE `sign_up` SET `user_name`=? where `user_id`=?', [req.body.user_name, req.body.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/login', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `sign_up` WHERE `user_id`=?', [req.body.user_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});
app.get('/logindetails/:user_id', function (req, res) {
   console.log(req);
   connection.query('select * from sign_up where user_id=?', [req.params.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/find/:name', function (req, res) {
   console.log(req);
   connection.query('select * from sign_up where f_name=? or l_name=?', [req.params.name,req.params.name], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


module.exports=app;