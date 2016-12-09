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

app.controller('quizListCtrl', function ($scope, quizService) {

  quizService.getAllQuizzes().then(function (qs) {
    $scope.quizzes = qs;
    console.log(qs)
  }, function (error) {
    $scope.status = 'Cannot load data'
  })
});

app.controller('quizCtrl', function ($scope, $routeParams, quizService) {
  var quizid = $routeParams.quizid;

  quizService.getAllQuizzes().then(function (qarray) {
    console.log(qarray);
    for (var i = 0; i < qarray.length; i++)
      if (qarray[i].id == quizid) {
        $scope.quiz = qarray[i];
        break
      }
  });

  $scope.answersRegister = [-1, -1, -1, -1];
  $scope.quizOngoing = false;

  $scope.startQuiz = function () {
    $scope.quizOngoing = true;
  };

  $scope.selectOption = function (parentIndex, index) {
    $scope.answersRegister[parentIndex] = index;
    console.log($scope.answersRegister);
  };

});

app.controller('addQuizCtrl', ['$scope', function ($scope) {

}]);
