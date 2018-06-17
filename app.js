var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var stateapi = require('./routes/state_api');
var courseapi = require('./routes/course_api');
var discussion = require('./routes/discussion_api');
var loginapi = require('./routes/login_api');
var profileapi = require('./routes/profile_api');
var cityapi = require('./routes/state_city_api');
var uniapi = require('./routes/uni_api');
var catapi = require('./routes/uni_cat');
var unicourse = require('./routes/uni_course_api');
var rating = require('./routes/uni_rating_api');
var uni_icon = require('./routes/icon_api');
var type_api = require('./routes/typeapi');
var replyapi = require('./routes/reply_api');
var contactapi = require('./routes/contact_api');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/stateapi/', stateapi);
app.use('/courseapi/', courseapi);
app.use('/cityapi/', cityapi);
app.use('/uniapi/', uniapi);
app.use('/catapi/', catapi);
app.use('/unicourse/', unicourse);
app.use('/iconapi/', uni_icon);
app.use('/typeapi/', type_api);
app.use('/dis_api/', discussion);
app.use('/profileapi/', profileapi);
app.use('/loginapi/', loginapi);
app.use('/reply_api/', replyapi);
app.use('/contactapi/', contactapi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
