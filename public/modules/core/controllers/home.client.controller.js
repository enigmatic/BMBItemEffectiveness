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

        $scope.items = [];
        $scope.items.sort(sortItemFunction);

        var getItems = function (champ) {
            if (!champ) {
                $http.get('/api/items').success(function (response) {
                    // If successful we assign the response to the global item model
                    $scope.items = response.sort(sortItemFunction);
                    if ($scope.selectedItem) {
                        var sel = response.filter(function (obj) {
                            // coerce both obj.id and id to numbers 
                            // for val & type comparison
                            return +obj.id === +$scope.selectedItem.id;
                        })[0];
                        if (sel) {
                            $scope.selectedItem = sel;
                        } else {
                            $scope.selectedItem.wins = 0;
                            $scope.selectedItem.total = 0;
                        }
                    }

                }).error(function (response) {
                    $scope.error = response.message;
                });
            } else {
                $http.get('/api/champion/' + champ.id).success(function (response) {
                    // If successful we assign the response to the global item model

                    $scope.items = response.sort(sortItemFunction);
                    if ($scope.selectedItem) {
                        var sel = response.filter(function (obj) {
                            // coerce both obj.id and id to numbers 
                            // for val & type comparison
                            return +obj.id === +$scope.selectedItem.id;
                        })[0];
                        if (sel) {
                            $scope.selectedItem = sel;
                        } else {
                            $scope.selectedItem.wins = 0;
                            $scope.selectedItem.total = 0;
                        }
                    }

                }).error(function (response) {
                    $scope.error = response.message;
                });
            }
        };

        var statDetail = function (_text, _average, _item, _flipGood) {
            var average = parseFloat(_average);
            var item = parseFloat(_item);

            return {
                text: _text,
                avg: average,
                item: item,
                avgPct: 100 * average / (average + item),
                itemPct: 100 * item / (average + item),
                good: _flipGood ? average > item : item > average
            };
        };

        var calcStats = function () {
            if ($scope.champItemDetail && $scope.champStats) {
                var champStats = $scope.champStats,
                    champItemDetail = $scope.champItemDetail;
                $scope.champItemDetail.itemStats = [];

                $scope.champItemDetail.itemStats.push(statDetail('Kills', champStats.kills, champItemDetail.kills));
                $scope.champItemDetail.itemStats.push(statDetail('Deaths', champStats.deaths, champItemDetail.deaths, true));
                $scope.champItemDetail.itemStats.push(statDetail('Assists', champStats.assists, champItemDetail.assists));

                var avg = (parseFloat(champStats.kills) + parseFloat(champStats.assists)) / parseFloat(champStats.deaths);
                var item = (parseFloat(champItemDetail.kills) + parseFloat(champItemDetail.assists)) / parseFloat(champItemDetail.deaths);

                $scope.champItemDetail.itemStats.push(statDetail('KDA', avg, item));
                $scope.champItemDetail.itemStats.push(statDetail('cs', champStats.cs, champItemDetail.cs));
                $scope.champItemDetail.itemStats.push(statDetail('gold', champStats.gold, champItemDetail.gold));
            }
        };

        var getChampItemDetail = function () {
            $scope.champItemDetail = null;
            if ($scope.selectedChampion && $scope.selectedItem) {
                $http.get('/api/champion/' + $scope.selectedChampion.id + '/item/' + $scope.selectedItem.id).success(function (response) {
                    // If successful we assign the response to the global item model
                    $scope.champItemDetail = response;
                    calcStats();
                }).error(function (response) {
                    $scope.error = response.message;
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
            if ($champion) {
                $http.get('/api/champion/' + $scope.selectedChampion.id + '/stats').success(function (response) {
                    // If successful we assign the response to the global item model
                    $scope.champStats = response;
                    calcStats();
                }).error(function (response) {
                    $scope.error = response.message;
                });
            }
            getChampItemDetail();
        };

        $scope.TrustDangerousSnippet = function (snippet) {
            return $sce.trustAsHtml(snippet);
        };

        $scope.clickItem = function ($item) {
            $scope.selectedItem = $item;
            getChampItemDetail();
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
