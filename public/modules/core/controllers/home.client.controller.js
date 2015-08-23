'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function ($scope, $http) {
        $http.get('/api/champions').success(function (response) {
            // If successful we assign the response to the global user model
            $scope.champions = response;
        }).error(function (response) {
            $scope.error = response.message;
        });


	}
]);