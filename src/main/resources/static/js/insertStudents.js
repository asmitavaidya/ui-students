angular.module('studentsApp', [])
	.controller('insertStudentController', function($scope, $http) {
		$http({method: 'POST', url: 'http://localhost:8081/students'})
			.then(
				function(response) {
					$scope.students = response.data;
				}, 
				function(response) {
					console.log("There was some error!");
				}
			);
		
});