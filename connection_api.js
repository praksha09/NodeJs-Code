var http = require("http");
var app = require('express')();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var stateapi = require('./state_api');
var courseapi=require('./course_api');
var discussion=require('./discussion_api');
var loginapi= require('./login_api');
var profileapi= require('./profile_api');
var cityapi =require('./state_city_api');
var uniapi = require('./uni_api');
var catapi = require('./uni_cat');
var unicourse =require('./uni_course_api');
var rating = require('./uni_rating_api');
var uni_icon=require('./icon_api');
var type_api=require('./typeapi');
var replyapi=require('./reply_api');
var contactapi=require('./contact_api');


//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration
 
//create app server
var server = app.listen(3000,  "127.0.0.1", function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("Example app listening at http://%s:%s", host, port); 
});

app.use('/stateapi/', stateapi);
app.use('/courseapi/',courseapi);
app.use('/cityapi/',cityapi);
app.use('/uniapi/',uniapi);
app.use('/catapi/',catapi);
app.use('/unicourse/',unicourse);
app.use('/iconapi/',uni_icon);
app.use('/typeapi/',type_api);
app.use('/dis_api/',discussion);
app.use('/profileapi/',profileapi);
app.use('/loginapi/',loginapi);
app.use('/reply_api/',replyapi);
app.use('/contactapi/',contactapi);
/*
app.use('/rating/',rating);
*/
module.exports = app;