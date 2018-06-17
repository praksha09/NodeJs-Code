var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 

var connection=require('../controllers/conn.js');
//rest api to get all results
app.get('/uni', function (req, res) {
   connection.query('select * from university', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to get a single employee data
app.get('/uni/:cat_id', function (req, res) {
   console.log(req);
   connection.query('select * from university where cat_id=?', [req.params.cat_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to create a new record into mysql database
app.post('/uni', function (req, res) {
   var postData  = req.body;
   console.log(postData);
   connection.query('INSERT INTO university SET ?', postData, function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(postData));
 });
});
 
//rest api to update record into mysql database
app.put('/uni', function (req, res) {
   connection.query('UPDATE `university` SET `u_name`=? where `u_id`=?', [req.body.u_name, req.body.u_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
 
//rest api to delete record from mysql database
app.delete('/uni', function (req, res) {
console.log(req.body);    connection.query('DELETE FROM `university` WHERE `u_id`=?', [req.body.u_id], function (error, results, fields) {
  if (error) throw error;    
  res.end('Record has been deleted!');  
});
});

app.get('/unidetails', function (req, res) {
   connection.query('select u.u_id,u.u_name,u.lat,u.lng,u.rating,u.email,s.s_id,s.s_name,u.city,c.cat_id,c.category,i.icon from university u inner join state s inner join uni_category c inner join uni_icon i on u.cat_id=c.cat_id and u.s_id=s.s_id and i.u_id=u.u_id', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/unidetails/:s_id', function (req, res) {
   connection.query('select u.u_id,u.u_name,u.lat,u.lng,u.rating,u.email,s.s_name,u.city,c.category,i.icon from university u inner join state s inner join uni_category c inner join uni_icon i on u.cat_id=c.cat_id and u.s_id=s.s_id and u.u_id=i.u_id and s.s_id=? ',[req.params.s_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/unicategory/:cat_id', function (req, res) {
   connection.query('select u.u_id,u.u_name,u.lat,u.lng,u.rating,u.email,s.s_name,u.city,c.category,i.icon from university u inner join state s inner join uni_category c inner join uni_icon i on u.cat_id=c.cat_id and u.s_id=s.s_id and u.u_id=i.u_id and c.cat_id=? ',[req.params.cat_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/unidetails/1/:s_id', function (req, res) {
   connection.query('select u.u_id,u.u_name,u.lat,u.lng,u.rating,u.email,s.s_name,u.city,c.category,i.icon from university u inner join state s inner join uni_category c inner join uni_icon i on u.cat_id=c.cat_id and u.s_id=s.s_id and u.u_id=i.u_id and u.cat_id=1 and s.s_id=?',[req.params.s_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/uni_compare/:u_id', function (req, res) {
   connection.query('select u.u_id,u.u_name,u.lat,u.lng,u.rating,u.email,s.s_name,u.city,cat.category,i.icon from university u inner join state s inner join uni_category cat inner join uni_icon i  on u.cat_id=cat.cat_id and u.s_id=s.s_id and i.u_id=u.u_id and u.u_id=?',[req.params.u_id] ,function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

module.exports=app;