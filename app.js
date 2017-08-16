angular.module('plantApp', []).controller('PlantCtrl', function($scope, $http){
	var auth = window.btoa("admin:PlantsVsZombies");
	
	$http({
		method: 'GET',
		url: 'http://raspberrypi:8080/plant/all',
		headers: {
		  'Content-Type':'application/json',
		  'Authorization': 'basic' + auth
		}
	}).then(function(response) {
		$scope.plants = response.data;
	}, function(response) {
		console.log('error',response)
	});

	$http({
		method: 'GET',
		url: 'http://raspberrypi:8080/plant/0/',
		headers: {
			'Content-Type':'application/json',
			'Authorization': 'basic' + auth
		}
	}).then(function(response) {
		$scope.plant0 = response.data;
	}, function(response) {
		console.log('error',response)
	});

	$http({
		method: 'GET',
		url: 'http://raspberrypi:8080/plant/0/humidity',
		headers: {
			'Content-Type':'application/json',
			'Authorization': 'basic' + auth
		}
	}).then(function(response) {
		$scope.plant0.humidity = 100 - response.data;
		getWaterRingChart("waterRing", getDegreeFromPercent(response.data));
	}, function(response) {
		console.log('error',response)
	});
	
	$scope.water = function() {
		$http({
			method: 'GET',
			url: 'http://raspberrypi:8080/plant/0/water',
			headers: {
				'Content-Type':'application/json',
				'Authorization': 'basic' + auth
			}
		}).then(function(response) {
			console.log('watered',response)
		}, function(response) {
			console.log('error',response)
		});
	}
});
