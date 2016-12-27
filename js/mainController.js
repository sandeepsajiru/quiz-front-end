app.controller('homeCtrl', function ($scope, $location, loginSvc) {

  $scope.authorLogin = function (name) {
    loginSvc.authorSignin(name);
  };

  $scope.candidateLogin = function (name) {
    loginSvc.candidateSignin(name)
  }
});


app.controller('mainCtrl', function ($scope, $location, loginSvc) {
  $scope.username = loginSvc.getUsername();
  $scope.currentRole = loginSvc.getCurrentRole();

  $scope.$watch(function () {
    return loginSvc.getUsername();

  }, function (nval, oval) {
    $scope.username = nval;
  });

  $scope.$watch(function () {
    return loginSvc.getCurrentRole();

  }, function (nval, oval) {
    $scope.currentRole = nval;
  });

  $scope.switchRole = function () {
    loginSvc.switchRole();
  };
});
