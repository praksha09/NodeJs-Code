var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 

var connection=require('./conn.js');
//rest api to get all results
app.get('/uni_course', function (req, res) {
   connection.query('select u.u_name,c.c_name,uc.u_id,uc.c_id,uc.id from uni_course uc inner join course c inner join university u on uc.u_id=u.u_id and uc.c_id=c.c_id', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/uni_course/:id', function (req, res) {
   console.log(req);
   connection.query('select u.u_name,c.c_name,uc.u_id,uc.c_id,uc.id from uni_course uc inner join course c inner join university u on uc.u_id=u.u_id and uc.c_id=c.c_id where u.u_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/uni_course', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO uni_course SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/uni_course', function (req, res) {
   connection.query('UPDATE `uni_course` SET `c_id`=? where `u_id`=?', [req.body.c_id, req.body.u_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/uni_course', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `uni_course` WHERE `c_id`=? and `u_id`=?', [req.body.c_id, req.body.u_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Course has been deleted!');  
});
});



module.exports=app;