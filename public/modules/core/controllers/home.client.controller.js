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
        debugger;
        $scope.items = [];
        $scope.items.sort(sortItemFunction);

        var getItems = function (champ) {
            var scope = $scope;

            if (!champ) {
                $http.get('/api/items').success(function (response) {
                    // If successful we assign the response to the global item model
                    // $scope.items = response.sort(sortItemFunction);

                    scope.items = response.sort(sortItemFunction);
                    //$scope.items.addAll(response);

                }).error(function (response) {
                    scope.error = response.message;
                });
            } else {
                $http.get('/api/champion/' + champ.id).success(function (response) {
                    // If successful we assign the response to the global item model

                    debugger;

                    scope.items = response.sort(sortItemFunction);

                    //$scope.items.addAll(response);

                }).error(function (response) {
                    scope.error = response.message;
                });
            }
        };

        $http.get('/api/champions').success(function (response) {
            // If successful we assign the response to the global champion model
            $scope.champions = response;
        }).error(function (response) {
            $scope.error = response.message;
        });


        $scope.selectChampion = function ($champion) {
            $scope.selectedChampion = $champion;
            getItems($champion);
        };

        $scope.TrustDangerousSnippet = function (snippet) {
            return $sce.trustAsHtml(snippet);
        };

        $scope.clickItem = function ($item) {
            $scope.selectedItem = $item;
            if ($item) {
                $http.get('/api/item/' + $item.id).success(function (response) {
                    // If successful we assign the response to the global selectItem model
                    $scope.selectedItemStats = response.sort(sortItemFunction);
                }).error(function (response) {
                    $scope.error = response.message;
                });
            }
        };

        getItems(null);
    }
]);
