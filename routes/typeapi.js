var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection=require('../controllers/conn.js'); 
//rest api to get all results
app.get('/type', function (req, res) {
   connection.query('select * from disc_type', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/type/:type_id', function (req, res) {
   console.log(req);
   connection.query('select * from disc_type where type_id=?', [req.params.type_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/type', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO disc_type SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/type', function (req, res) {
   connection.query('UPDATE `disc_type` SET `type`=? where `type_id`=?', [req.body.type, req.body.type_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/type', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `disc_type` WHERE `type_id`=?', [req.body.type_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});
module.exports = app;