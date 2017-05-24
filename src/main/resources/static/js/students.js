var app = angular.module('studentsApp', []);

app.controller('studentsController', function($scope, $http) {

	$scope.getStudents = function() {
		
		$http({method: 'GET', url: 'http://localhost:8081/students'})
		.then(
			function(response) {
				$scope.students = response.data;
			}, 
			function(response) {
				console.log("There was some error!");
			}
		);
	}
	
	$scope.insertStudent = function() {
		var dataToInsert = {name : $scope.name, course : $scope.course};
		$http({method: 'POST', url: 'http://localhost:8081/students', data: dataToInsert})
			.then(
				function(data, status, headers, config) {
					$scope.message = data;
					$scope.getStudents();
				},
				function(data, status, headers, config) {
					alert( "failure message: " + JSON.stringify({data: data}));
				}
				
			);		
		$scope.name='';
		$scope.course='';
	}

});
