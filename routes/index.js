var express = require('express');
var router = express.Router();

var findServer = require('bt-find-server');

/**
 * GET route renders homepage
 */
router.get('/', function(req, res, next) {
  res.render('index');
});

/**
 * GET route to execute mock server tests and return results.
 */
router.get('/run-test', function(req, res, next) {

	var mockServers = [{
		"url": "http://localhost:3000/mock-url-one",
		"priority": 1
	}, {
		"url": "http://localhost:3000/mock-url-two",
		"priority": 7
	}, {
		"url": "http://localhost:3000/mock-url-three",
		"priority": 2
	}, {
		"url": "http://localhost:3000/mock-url-four",
		"priority": 4
	}];

	findServer(mockServers).then(function(results) {
		return res.status(200).json(results);
	}).catch(function(error) {
		return res.status(500).json(error);
	});

});

// ===========================================================
// All mock server responses are listed below as GET routes.
// ===========================================================

/**
 * Immediately returns status code 400.
 */
router.get('/mock-url-one', function(req, res) {
	return res.status(400).json({ success: false });
});

/**
 * Immediately returns status code 200.
 * This url has priority value of 7.
 */
router.get('/mock-url-two', function(req, res) {
	return res.status(200).json({ success: true });
});

/**
 * Immediately returns status code 200.
 * This url has priority value of 2 ahead of previous route
 * with priority value of 7. Should result in this being the
 * top url returned by findServer() function
 */
router.get('/mock-url-three', function(req, res) {
	return res.status(200).json({ success: true });
});

/**
 * This route should timeout after not returning a response within
 * the (5) sec timout requirement.
 */
router.get('/mock-url-four', function(req, res) {
	setTimeout(function() {
		res.status(500).json({ success: false });
	}, 8000);
});

module.exports = router;
