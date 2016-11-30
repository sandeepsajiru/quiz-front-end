app.controller('homeController',['$scope', function($scope){

}])

app.controller('mainController',['$scope', function($scope){

}])

app.controller('quizzerController',['$scope', function($scope, $http) {
  $http.get('data/quizzes.json').then(function(res){
    $scope.quizzes = res.data
  })
}])
