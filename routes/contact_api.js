var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 
var connection=require('../controllers/conn.js');
//rest api to get all results
app.get('/contact', function (req, res) {
   connection.query('select * from contact', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/contact/:email', function (req, res) {
   console.log(req);
   connection.query('select * from contact where email=?', [req.params.email], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/contact', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO contact SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/contact', function (req, res) {
   connection.query('UPDATE `contact` SET `fname`=? where email=? ', [req.body.fname, req.body.email], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/contact', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `contact` WHERE `id`=?', [req.body.id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});



module.exports=app;