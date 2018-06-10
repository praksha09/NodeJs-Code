var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection=require('./conn.js')
//rest api to get all results
app.get('/cat', function (req, res) {
   connection.query('select * from uni_category', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/cat/:id', function (req, res) {
   console.log(req);
   connection.query('select * from uni_category where cat_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/cat', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO uni_category SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/cat', function (req, res) {
   connection.query('UPDATE `uni_category` SET `category`=? where `cat_id`=?', [req.body.category, req.body.cat_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/cat', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `uni_category` WHERE `cat_id`=?', [req.body.cat_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

module.exports=app;