/**
 * Created by Abhinav on 27-12-2016.
 */

app.controller('quizListCtrl', function ($scope, loginSvc, quizService) {
  $scope.username = loginSvc.getUsername();
  $scope.currentPage = 0;
  $scope.pageLength = 5;
  $scope.quizzes = [];
  $scope.searchQuiz = '';

  $scope.$watch(function () {
    return loginSvc.getCurrentRole();

  }, function (nval, oval) {
    $scope.currentRole = nval;
  });

  quizService.getAllQuizzes().then(function (qs) {
    $scope.quizzes = qs;

    $scope.noOfPages = function () {
      return Math.ceil($scope.quizzes.length / $scope.pageLength);
    };

    console.log($scope.noOfPages());
  }, function (error) {
    $scope.status = 'Cannot load data'
  })
});
