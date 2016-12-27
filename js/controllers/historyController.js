/**
 * Created by Abhinav on 28-12-2016.
 */

app.controller('histCtrl', function ($scope, loginSvc, histSvc, quizService) {
  var username = loginSvc.getUsername();

  $scope.user = {};
  $scope.quizzes = {};
  histSvc.getHistory().then(function (hist) {
    for (var i = 0; i < hist.length; i++) {
      if (hist[i].username === username) {
        $scope.user = hist[i];
      }
    }
    console.log($scope.user);
  });

  quizService.getAllQuizzes().then(function (qs) {
    $scope.quizzes = qs;
  });

  $scope.getQuizName = function(qid) {
    for(var i=0;i<$scope.quizzes.length;i++) {
      if($scope.quizzes[i].id === qid){
        return $scope.quizzes[i].name + ' - ' + $scope.quizzes[i].level;
      }
    }
  };

  $scope.parseDate = function(datestr) {
    let dateObj = new Date(datestr);
    return dateObj.toDateString() + ' ' + dateObj.toTimeString();
  }
});
