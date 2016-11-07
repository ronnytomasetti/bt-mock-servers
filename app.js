var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');

// =================================================================
// Initialize new Express app
// =================================================================
var app = express();

app.use(cors());

// =================================================================
// View engine setup and public web folder
// =================================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

// =================================================================
// Setup console logger
// =================================================================
app.use(logger('dev'));

// =================================================================
// Configure body-parser middleware
// =================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// =================================================================
// Configure application routes
// =================================================================
app.use('/', routes);

// Catch 404 errors, forward to error handlers below.
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// =================================================================
// Error handler - development error handler will print stacktrace
// =================================================================
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// =================================================================
// Error handler - production handler not leaking stacktrace to user
// =================================================================
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
