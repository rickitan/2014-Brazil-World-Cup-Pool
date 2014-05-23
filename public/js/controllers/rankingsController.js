var  app = angular.module('quinielaApp');

app.controller('rankingsController', function ($scope, Rankings) {

  $scope.users = Rankings.query();
  $scope.users.$promise.then(function (result) {
    $scope.users = result;
  });




})