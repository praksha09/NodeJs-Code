var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 



 var connection=require('../controllers/conn.js');
//rest api to get all results
app.get('/city', function (req, res) {
   connection.query('select * from state_city', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/city/:id', function (req, res) {
   console.log(req);
   connection.query('select * from state_city where s_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/city', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO state_city SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/city', function (req, res) {
   connection.query('UPDATE `state_city` SET `city`=? where `id`=?', [req.body.city, req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/city/:id', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `state_city` WHERE `id`=?', [req.params.id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

module.exports=app;