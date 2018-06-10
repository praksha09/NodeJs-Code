var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 
var connection=require('./conn.js'); 
//rest api to get all results
app.get('/profile', function (req, res) {
   connection.query('select * from profile', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/profile/:user_id', function (req, res) {
   console.log(req);
   connection.query('select * from profile where user_id=?', [req.params.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/profile', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO profile SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/profile/:user_id', function (req, res) {
   connection.query('UPDATE `profile` SET `father_name`=? where `user_id`=?', [req.body.father_name, req.body.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to delete record from mysql database
app.delete('/profile', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `profile` WHERE `user_id`=?', [req.body.user_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

app.get('/user/:user_id', function (req, res) {
   console.log(req);
   connection.query('select p.percentage,p.dream_uni,p.school_name,p.course,p.joining_year,s.f_name,s.l_name from profile p inner join sign_up s on p.user_id=s.user_id and s.user_id=?', [req.params.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

/*app.get('/similar/:user_id', function (req, res) {
   console.log(req);
   connection.query('(select s.user_id,s.f_name,s.l_name,p.percentage,p.dream_uni from profile p inner join sign_up s on s.user_id=p.user_id) right join profile on profile.percentage=p.percentage or profile.dream_uni=p.dream_uni where `profile.user_id`=?', [req.params.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});*/

app.get('/similar/:user_id', function (req, res) {
   console.log(req);
   connection.query('(select s.user_id,s.f_name,s.l_name,p.percentage,p.dream_uni from profile p inner join sign_up s on s.user_id=p.user_id and p.percentage=(select percentage from profile where user_id=?))', [req.params.user_id,req.params.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

module.exports=app;