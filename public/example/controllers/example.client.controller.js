angular.module('example').controller('ExampleContoller', ['$scope', 'Authentication',
 function($scope, Authentication){
  $scope.name = Authentication.user ? Authentication.user.fullName :
'MEAN Application';
}]);