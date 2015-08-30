module.exports = function() {
	var passport = require('passport');
	var passportLocal = require('passport-local');
	var bcrypt = require('bcrypt');
	var userService = require('../services/user-service');

	passport.use(new passportLocal.Strategy({usernameField: 'email'}, function(email, password, next) {
		userService.findUser(email, function(err, user) {
			if(err) {
				console.log('error finding user: ' + JSON.stringify(err));
				return next(err);
			}
			
			if(!user) {
				console.log('user not found: email -> ' + email);
				return next(null, null);
			}
			
			bcrypt.compare(password, user.password, function(err, same) {
				if(err) {
					return next(err);
				}
				if(!same) {
					return next(null, null);
				}
				
				console.log('user found');
				next(null, user);
			});
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