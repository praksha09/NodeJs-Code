var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 
var connection=require('./conn.js'); 
//rest api to get all results
app.get('/rating', function (req, res) {
   connection.query('select * from uni_rating', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/rating/:id', function (req, res) {
   console.log(req);
   connection.query('select * from uni_rating where u_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/rating', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO uni_rating SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/rating', function (req, res) {
   connection.query('UPDATE `uni_rating` SET `rating`=? where `u_id`=?', [req.body.rating, req.body.u_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/rating', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `uni_rating` WHERE `u_id`=?', [req.body.u_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

module.exports=app;