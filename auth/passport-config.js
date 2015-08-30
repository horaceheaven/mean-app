module.exports = function() {
	var passport = require('passport');
	var passportLocal = require('passport-local');
	var userService = require('../services/user-service');

	passport.use(new passportLocal.Strategy({usernameField: 'email'}, function(email, password, next) {
		userService.findUser(email, function(err, user) {
			if(err) {
				console.log('error finding user: ' + JSON.stringify(err));
				return next(err);
			}
			
			if(!user || user.password !== password) {
				console.log('user not found: email -> ' + user.email);
				return next(null, null);
			}
			
			next(null, user);
			console.log('user found');
		});
	}));

	passport.serializeUser(function(user, next) {
		next(null, user.email);
	});

	passport.deserializeUser(function(email, next) {
		userService.findUser(email, function(err, user) {
			next(err, user);
		});
	});
};