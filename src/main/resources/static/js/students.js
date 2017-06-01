var app = angular.module('studentsApp', []);

app.controller('studentsController', function($scope, $http) {
	
	var domainName = "54.245.63.109";
	//var domainName = "localhost";
	
	$scope.init = function() {
		$scope.editMode = false;
		$scope.invalidInput = false;
		$scope.getStudents();
	}

	$scope.getStudents = function() {	
		$http({method: 'GET', url: 'http://' + domainName + ':8080/students'})
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
		if (angular.isUndefined($scope.name) || angular.isUndefined($scope.course) || ($scope.name === "") || ($scope.course === "")) {
			$scope.invalidInput = true;
			return;
		}
		var dataToInsert = {name : $scope.name, course : $scope.course};
		$http({method: 'POST', url: 'http://' + domainName + ':8080/students', data: dataToInsert})
			.then(
				function() {
					$scope.getStudents();
				},
				function(data, status, headers, config) {
					alert( "failure message: " + JSON.stringify({data: data}));
				}
				
			);		
		$scope.name='';
		$scope.course='';
	}
	
	$scope.deleteStudent = function(id) {
		$http({method: 'DELETE', url: 'http://' + domainName + ':8080/students/'+id})
			.then(
				function() {
						$scope.getStudents();
					},
					function(data, status, headers, config) {
						alert( "failure message: " + JSON.stringify({data: data}));
					}
					
			);
	}
	
	$scope.editStudent = function(id, name, course) {
		$scope.editMode = true;
		$scope.id = id;
		$scope.name = name;
		$scope.course = course;
	}
	
	$scope.cancelEdit = function() {
		$scope.init();
		$scope.name='';
		$scope.course='';
	}
	
	$scope.updateStudent = function() {
		debugger
		if (angular.isUndefined($scope.name) || angular.isUndefined($scope.course) || ($scope.name === "") || ($scope.course === "")) {
			debugger
			$scope.invalidInput = true;
			return;
		}
		var dataToEdit = {name : $scope.name, course : $scope.course};
		$http({method: 'PUT', url: 'http://' + domainName + ':8080/students/'+$scope.id, data: dataToEdit})
		.then(
			function() {
				$scope.init();
			},
			function(data) {
				alert( "failure message: " + JSON.stringify({data: data}));
			}	
		
		);
		$scope.name='';
		$scope.course='';
	}

});
