var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
// db connections
require('./db/db')
var MongoDBStore = require('connect-mongodb-session')(session);

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var projectsRouter = require('./routes/projects');
var contactRouter = require('./routes/contact');
var serviceRouter = require('./routes/services');
var authRouter = require('./routes/auth');
var businessRouter = require('./routes/business');
var logoutRouter = require('./routes/logout');

var app = express();

var store = new MongoDBStore({
    uri: "mongodb+srv://vincegunday17:SeSGBgk86J6vEtFd@cluster0.zie08kj.mongodb.net/?retryWrites=true&w=majority",
    collection: 'mySessions'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('layout', '../views/layout');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: true }
}));

app.use(passport.authenticate('session'));

// routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/about', aboutRouter);
app.use('/project', projectsRouter);
app.use('/contact', contactRouter);
app.use('/services', serviceRouter);
app.use('/business', businessRouter);
app.use('/logout', logoutRouter);


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
