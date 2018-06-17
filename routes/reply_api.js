var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection=require('../controllers/conn.js'); 
//rest api to get all results
app.get('/reply', function (req, res) {
   connection.query('select * from reply', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/reply/:id', function (req, res) {
   console.log(req);
   connection.query('select r.reply,s.f_name,s.l_name from reply r inner join discussion d inner join sign_up s on r.dis_id=d.dis_id and r.user_id=s.user_id and r.dis_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/reply', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO reply SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/reply', function (req, res) {
   connection.query('UPDATE `reply` SET `reply`=? where `user_id`=?', [req.body.message, req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/reply', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `reply` WHERE `dis_id`=?', [req.body.id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});
app.get('/reply_dis', function (req, res) {
   connection.query('select d.dis_id,d.user_id,d.message,d.type_id,t.type,u.f_name,u.l_name from discussion d inner join sign_up u inner join disc_type t on d.user_id=u.user_id and d.type_id=t.type_id', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/reply_dis/:id', function (req, res) {
   console.log(req);
   connection.query('select r.reply,s.f_name,s.l_name from reply r inner join discussion d inner join sign_up s on r.dis_id=d.dis_id and r.user_id=s.user_id and r.dis_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

module.exports = app;