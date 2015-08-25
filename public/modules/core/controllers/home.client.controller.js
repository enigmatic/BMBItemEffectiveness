'use strict';

function sortItemFunction(a, b) {

    var aT = a.wins / a.total,
        bT = b.wins / b.total;


    if (aT < bT) {
        return 1;
    } else if (aT > bT) {
        return -1;
    }

    return 0;
}


angular.module('core').controller('HomeController', ['$scope', '$http', '$sce',
	function ($scope, $http, $sce) {
        $http.get('/api/champions').success(function (response) {
            // If successful we assign the response to the global user model
            $scope.champions = response;
        }).error(function (response) {
            $scope.error = response.message;
        });

        $http.get('/api/items').success(function (response) {
            // If successful we assign the response to the global user model
            $scope.items = response.sort(sortItemFunction);
        }).error(function (response) {
            $scope.error = response.message;
        });

        $scope.selectChampion = function ($champion) {
            $scope.selectedChampion = $champion;
        };

        $scope.TrustDangerousSnippet = function (snippet) {
            return $sce.trustAsHtml(snippet);
        };

        $scope.clickItem = function ($item) {
            $scope.selectedItem = $item;
            if ($item) {
                $http.get('/api/item/' + $item.id).success(function (response) {
                    // If successful we assign the response to the global user model
                    $scope.selectedItemStats = response.sort(sortItemFunction);
                }).error(function (response) {
                    $scope.error = response.message;
                });
            }
        };
    }
]);
