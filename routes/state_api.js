var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 
var connection=require('../controllers/conn.js');
//rest api to get all results
app.get('/state', function (req, res) {
   connection.query('select * from state', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/state/:id', function (req, res) {
   console.log(req);
   connection.query('select * from state where s_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/state', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO state SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/state', function (req, res) {
   connection.query('UPDATE `state` SET `s_name`=? where `s_id`=?', [req.body.s_name, req.body.s_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/state/:id', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `state` WHERE `s_id`=?', [req.params.id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

app.get('/sname', function (req, res) {
   connection.query('select s_name from state', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

module.exports = app;
