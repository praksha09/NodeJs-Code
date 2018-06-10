var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection=require('./conn.js'); 
//rest api to get all results
app.get('/discussion', function (req, res) {
   connection.query('select id,type_id from discussion where dis_id=-1', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/discussion/:id', function (req, res) {
   console.log(req);
   connection.query('select * from discussion where user_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/discussion', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO discussion SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/discussion', function (req, res) {
   connection.query('UPDATE `discussion` SET `message`=? where `user_id`=?', [req.body.message, req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/discussion', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `discussion` WHERE id=? or dis_id=?', [req.body.id,req.body.id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});
app.get('/dis_user/:id', function (req, res) {
   connection.query('select d.id,d.dis_id,d.user_id,d.message,d.type_id,t.type,u.f_name,u.l_name from discussion d inner join sign_up u inner join disc_type t on d.user_id=u.user_id and d.type_id=t.type_id and dis_id=-1 and d.user_id=?',[req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/dis_reply/:id/:type_id', function (req, res) {
   connection.query('(select d.id,d.dis_id,d.user_id,d.message,d.type_id,t.type,u.f_name,u.l_name from discussion d inner join sign_up u inner join disc_type t on d.user_id=u.user_id and d.type_id=t.type_id and d.id=?) UNION ((select t1.id,t1.dis_id, t1.user_id, t1.message,t1.type_id,t.type,u.f_name,u.l_name from discussion t1, discussion t2 inner join sign_up u inner join disc_type t where t1.user_id=u.user_id and t1.type_id=t.type_id and t1.dis_id=t2.id and t1.type_id=? and t2.id=? ))', [req.params.id, req.params.type_id,req.params.id],function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

/*app.get('/dis_reply/:id', function (req, res) {
   connection.query('select d.id,d.dis_id,d.user_id,d.message,d.type_id,t.type,u.f_name,u.l_name from discussion d inner join sign_up u inner join disc_type t on d.user_id=u.user_id and d.type_id=t.type_id and d.id=?', [req.params.id],function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});*/


module.exports = app;