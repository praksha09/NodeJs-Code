var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 



var connection=require('../controllers/conn.js');
//rest api to get all results
app.get('/icon', function (req, res) {
   connection.query('select * from uni_icon', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/icon/:id', function (req, res) {
   console.log(req);
   connection.query('select * from uni_icon where u_id=?', [req.params.u_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/icon', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO uni_icon SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/icon', function (req, res) {
   connection.query('UPDATE `uni_icon` SET `icon`=? where `id`=?', [req.body.icon, req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/icon/:id', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `uni_icon` WHERE `id`=?', [req.params.id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

module.exports=app;