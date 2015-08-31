var orderService =  require('../services/order-service');

var express = require('express');
var router = express.Router();

/* GET home page. */
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

module.exports = router;
