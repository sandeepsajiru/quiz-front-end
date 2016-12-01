app.controller('homeController',['$scope', function($scope){

}])

app.controller('mainController',['$scope', function($scope){

}])

app.controller('quizListController', function($scope, quizService) {

  quizService.getAllQuizzes().success(function (qs) {
    $scope.quizzes = qs
  }).error(function(error) {
    $scope.status = 'Cannot load data'
  })
})

app.controller('quizController',['$scope', function($scope, $routeParams, quizService){
  var requestedQuizID = $routeParams.param
  $scope.quiz = quizService.getQuiz(requestedQuizID)
}])
