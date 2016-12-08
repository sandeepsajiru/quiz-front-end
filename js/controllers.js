app.controller('homeCtrl', ['$scope', function ($scope) {

}]);

app.controller('mainCtrl', ['$scope', function ($scope) {

}]);

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

  $scope.answersRegister = [0,0,0,0];
  $scope.quizOngoing = false;

  $scope.startQuiz = function () {
    $scope.quizOngoing = true;
  };

  $scope.selectOption = function (parentIndex,index) {
    $scope.answersRegister[parentIndex] = index;
    console.log($scope.answersRegister);
  };

});

app.controller('addQuizCtrl', ['$scope', function ($scope) {

}]);
