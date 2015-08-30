var mongoose = require('mongoose');
var userService = require('../services/user-service');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: {type: String, required: 'Please enter your first name'},
	lastName: {type: String, required: 'Please enter your last name'},
	roomNumber: {type: Number, required: 'Please enter your room number', min: [100, 'Not a valid room number']},
	email: {type: String, required: 'Please enter your email'},
	password: {type: String, required: 'Please enter your password'},
	created: {type: Date, default: Date.now}
});

userSchema.path('email').validate(function(email, next) {
	userService.findUser(email, function(err, user) {
		if(err) {
			console.log(err);
			return next(false);
		}
		next(!user);
	});
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};