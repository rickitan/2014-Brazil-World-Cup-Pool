var  app = angular.module('quinielaApp');

app.controller('rankingsController', function ($scope, Rankings, $http) {
  if(window.user) $scope.user = window.user;

  function getRankings(){
    $scope.users = Rankings.query();
    $scope.users.$promise.then(function (result) {
      $scope.users = result;
    });
  }
  getRankings();


  $scope.calculateGroupPhaseRankings = function(){
      $http({method: 'GET', url: '/calculateRankingsGroupPhase'}).
          success(function(data, status, headers, config) {
            getRankings();
          }).
          error(function(data, status, headers, config) {
              alert("Error" + data);
          });
  }

  $scope.calculateSecondPhaseRankings = function(){
        $http({method: 'GET', url: '/calculateRankingsSecondPhase'}).
            success(function(data, status, headers, config) {
              getRankings();
            }).
            error(function(data, status, headers, config) {
              alert("Error" + data);
            });
  }




})