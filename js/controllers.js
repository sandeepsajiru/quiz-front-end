app.controller('homeController', ['$scope', function ($scope) {

}])

app.controller('mainController', ['$scope', function ($scope) {

}])

app.controller('quizListController', function ($scope, quizService) {

  quizService.getAllQuizzes().success(function (qs) {
    $scope.quizzes = qs
    console.log(qs)
  }).error(function (error) {
    $scope.status = 'Cannot load data'
  })
})

app.controller('quizController', function ($scope, $routeParams, quizService) {
  var quizid = $routeParams.quizid

  quizService.getAllQuizzes().success(function (qarray) {
    console.log(qarray)
    for (var i = 0; i < qarray.length; i++)
      if (qarray[i].id == quizid) {
        $scope.quiz = qarray[i]
        break
      }
  })
})
