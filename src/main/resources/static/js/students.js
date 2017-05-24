var app = angular.module('studentsApp', []);

app.controller('studentsController', function($scope, $http) {

var getStudents = function() {
	
	$http({method: 'GET', url: 'http://localhost:8081/students'})
	.then(
		function(response) {
			$scope.students = response.data;
			//$scope.studentsService.test = "test2";
		}, 
		function(response) {
			console.log("There was some error!");
		}
	);
}

getStudents();

$scope.insertStudent = function() {
	var dataToInsert = {name : $scope.name, course : $scope.course};
	$http({method: 'POST', url: 'http://localhost:8081/students', data: dataToInsert})
		.then(
			function(data, status, headers, config) {
				$scope.message = data;
				getStudents();
			},
			function(data, status, headers, config) {
				alert( "failure message: " + JSON.stringify({data: data}));
			}
			
		);		
	$scope.name='';
	$scope.course='';
}

});
