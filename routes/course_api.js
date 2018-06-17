var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 

var connection=require('../controllers/conn.js');
//rest api to get all results
app.get('/course', function (req, res) {
   connection.query('select * from course', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/course/:id', function (req, res) {
   console.log(req);
   connection.query('select * from course where c_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/course', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO course SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/course', function (req, res) {
   connection.query('UPDATE `course` SET `c_name`=? where `c_id`=?', [req.body.c_name, req.body.c_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/course', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `course` WHERE `c_id`=?', [req.body.c_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

module.exports=app;