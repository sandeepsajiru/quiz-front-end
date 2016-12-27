/**
 * Created by Abhinav on 28-12-2016.
 */

app.controller('leaderCtrl', function ($scope, histSvc, quizService) {

  $scope.history = {};
  $scope.quizzes = {};
  histSvc.getHistory().then(function (hist) {
    $scope.history = hist;
    $scope.history.sort(function (a, b) {
      if (a.total > b.total)
        return -1;
      else if (a.total == b.total)
        return 0;
      else {
        return 1;
      }

    })
  });

  quizService.getAllQuizzes().then(function (qs) {
    $scope.quizzes = qs;
  });

  $scope.getQuizName = function (qid) {
    for (var i = 0; i < $scope.quizzes.length; i++) {
      if ($scope.quizzes[i].id === qid) {
        return $scope.quizzes[i].name + ' - ' + $scope.quizzes[i].level;
      }
    }
  };

  $scope.getCurrentDate = function () {
    let dateObj = new Date();
    return dateObj.toDateString();
  }
});
