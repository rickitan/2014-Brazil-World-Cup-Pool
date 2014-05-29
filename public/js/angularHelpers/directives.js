var  app = angular.module('quinielaApp');

app
  .directive('validateInputScore', function () {
    return {
      restrict: 'A',
      scope:{ngModel:"="},
      link: function (scope, element, attrs) {
        scope.$watch(attrs.ngModel, function (newVal, oldVal) {
          console.log("watching", newVal);

          //if(newVal == oldVal) return;
          if(newVal > 0 && (newVal % 1 === 0)){
            scope.ngModel = newVal;
          }else{
            alert("You can only enter positive numbers");
          }
        });
      }
    };
  });