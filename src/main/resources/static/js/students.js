var app = angular.module('studentsApp', []);

app.service('studentsService', function() {
	var test = "test";
});


app.controller('studentsController', function($scope, $http, studentsService) {
$scope.studentsService = studentsService;
$http({method: 'GET', url: 'http://localhost:8081/students'})
	.then(
		function(response) {
			$scope.students = response.data;
			$scope.studentsService.test = "test2";
		}, 
		function(response) {
			console.log("There was some error!");
		}
	);
});

app.controller('insertStudentController', function($scope, $http, studentsService) {
	$scope.studentsService = studentsService;	
	$scope.insertStudent = function() {
		var dataToInsert = {name : $scope.name, course : $scope.course};
		$http({method: 'POST', url: 'http://localhost:8081/students', data: dataToInsert})
			.then(
				function(data, status, headers, config) {
					$scope.message = data;
					debugger
				},
				function(data, status, headers, config) {
					alert( "failure message: " + JSON.stringify({data: data}));
				}
				
			);		
		debugger
		$scope.name='';
		$scope.course='';
	}
	
}); 
		
		



/*
var app = angular.module("myapp", []);
app.controller('cont1', function($scope) {
  $scope.fullname = "";
});
app.controller('cont2', function($scope) {
  $scope.fname = "";
});
*/