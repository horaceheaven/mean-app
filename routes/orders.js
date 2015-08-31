var orderService =  require('../services/order-service');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var vm = {
		title: 'Place an order',
		firstName: req.user ? req.user.firstName : null,
		orderId: req.session.orderId
	};

	console.log(JSON.stringify(vm));
  	
  	res.render('orders/index', vm);
});

router.get('/api/restaurants', function(req, res, next) {
	orderService.getRestaurants(function(err, restaurants) {
		if(err) {
			return res.status(500).json({error: 'failed to retrieve restaurants'});
		}
		res.json(restaurants);
	});
});

router.get('/api/restaurant-details/:restId', function(req, res, next) {
	orderService.getRestaurantDetails(req.params.restId, function(err, restDetails) {
		if(err) {
			return res.status(500).json({error: 'failed to retrieve restaurant details'});	
		}
		res.json(restDetails);
	});
});

module.exports = router;
