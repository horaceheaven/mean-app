var ordrx = require('ordrin-api');
var config = require('../config');

var _ = require('lodash');

var api = new ordrx.APIs(config.ordrxKey, ordrx.TEST);

exports.getRestaurants = function(next) {
	var hotel = config.address;

	var args = {
		datetime: 'ASAP',
		addr: hotel.addr,
		city: hotel.city,
		zip: hotel.zip
	};
	var restaurants = require('../data/ordrx.json');
	return next(null, restaurants);

	// This api is deprecated
	// api.delivery_list(args, function(err, restaurants) {
	// 	if(err) {
	// 		console.log(err);
	// 		return next(err);
	// 	}

	// 	restaurants = restaurants.filter(function(rest) {
	// 		return rest.is_delivering;
	// 	});
	// 	next(null, restaurants);
	// });
};

exports.getRestaurantDetails = function(restaurantId, next) {
	var restaurants = require('../data/ordrx.json');

	restaurants.forEach(function(element, index) {
		if(element.hasOwnProperty('id') && element.id == restaurantId) {
			return next(null, element);	
		}
	});

	return next(null, null);
};