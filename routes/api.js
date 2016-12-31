'use strict';

var express = require('express'),
	router = express.Router(),
	request = require('request'),
	creds = require('./credentials.js');

// GET tweets from Twitter API
router.get('/tweet/search/:text', function(req, res, next) {
	// CORS header not returned from Twitter API
	// add it to the response for this request
	res.set('Access-Control-Allow-Origin', '*');

	var options = {
		'url': 'https://api.twitter.com/1.1/search/tweets.json',
		'method': 'GET',
		'qs': {
			'q': req.params.text
		},
		'headers': {
			'Authorization': creds.twitter.bearerToken
		}
	};

	request(options, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		} else {
			res.status(response.statusCode)
			.send('Request Error ' +
				response.statusCode +
				': ' + 
				response.statusMessage);
		}
	});
});

// GET lat/lng from formatted address using Google Geocode API
router.get('/google/geocode/:address', function(req, res, next) {
	var options = {
		'url': 'https://maps.googleapis.com/maps/api/geocode/json',
		'method': 'GET',
		'qs': {
			'address': req.params.address,
			'key': creds.google.apiKey
		}
	};

	request(options, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		} else {
			res.status(response.statusCode)
			.send('Request Error ' +
				response.statusCode +
				': ' + 
				response.statusMessage);
		}
	});
});

// GET formatted address from lat/lng using Google Reverse Geocode API
// Requires query string: ?lat=<lat>&lng=<lng>
router.get('/google/reverse/geocode', function(req, res, next) {
	var options = {
		'url': 'https://maps.googleapis.com/maps/api/geocode/json',
		'method': 'GET',
		'qs': {
			'latlng': req.query.lat + ',' + req.query.lng,
			'location_type': 'APPROXIMATE',
			'result_type': 'locality|political|postal_code|administrative_area_level_1',
			'key': creds.google.apiKey
		}
	};

	request(options, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		} else {
			res.status(response.statusCode)
			.send('Request Error ' +
				response.statusCode +
				': ' + 
				response.statusMessage);
		}
	});
});

// GET events from SeatGeek API
router.get('/seatgeek/events', function(req, res, next) {
	var queryString = {
		'client_id': creds.seatgeek.clientId,
		'per_page': req.query.per_page,
		'page': req.query.page,
		'lat': req.query.lat,
		'lon': req.query.lng,
		'range': req.query.range
	};

	// check for taxonomy, add to queryString if present
	if (req.query.taxonomy) {
		queryString['taxonomies.name'] = req.query.taxonomy;
	}

	var options = {
		'url': 'https://api.seatgeek.com/2/events?sort=moving_score.desc',
		'method': 'GET',
		'qs': queryString
	};

	request(options, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		} else {
			res.status(response.statusCode)
			.send('Request Error ' +
				response.statusCode +
				': ' + 
				response.statusMessage);
		}
	});
});

// GET event taxonomies from SeatGeek API
router.get('/seatgeek/taxonomies', function(req, res, next) {
	var options = {
		'url': 'https://api.seatgeek.com/2/taxonomies',
		'method': 'GET',
		'qs': {
			'per_page': req.params.page
		}
	};

	request(options, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		} else {
			res.status(response.statusCode)
			.send('Request Error ' +
				response.statusCode +
				': ' + 
				response.statusMessage);
		}
	});
});

module.exports = router;