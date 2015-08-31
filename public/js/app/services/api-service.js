(function() {
	'use strict';

	angular
		.module('app')
		.factory('api', apiFactory);

	apiFactory.$inject = ['$http'];

	function apiFactory($http) {
		return {
			getRestaurants: getRestaurants
		};

		function getRestaurants() {
			return $http.get('/orders/api/restaurants')
				.then(function(response) {
					return response.data;
				});
		};
	}
}());