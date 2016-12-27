/**
 * Created by Abhinav on 27-12-2016.
 */

app.controller('quizCtrl', function ($scope, $http, $routeParams, quizService, loginSvc) {
  var quizid = $routeParams.quizid;
  $scope.curQues = 0;

  quizService.getAllQuizzes().then(function (qarray) {
    // console.log(qarray);
    for (var i = 0; i < qarray.length; i++)
      if (qarray[i].id == quizid) {
        $scope.quiz = qarray[i];
        console.log($scope.quiz.questions.length);
        break
      }
    $scope.correctRegister = new Array($scope.quiz.questions.length);
    $scope.correctRegister.fill(false);
    $scope.answersRegister = new Array($scope.quiz.questions.length);
    for (i = 0; i < $scope.answersRegister.length; i++) {
      $scope.answersRegister[i] = [];
    }
    console.log($scope.answersRegister);
  });

  $scope.quizOngoing = false;

  $scope.startQuiz = function () {
    $scope.quizOngoing = true;
  };

  $scope.quizProgress = function () {
    return ($scope.curQues)/$scope.quiz.questions.length*100
  };

  $scope.correctAnswers = function () {
    return $scope.correctRegister.filter(function(x){return x===true}).length;
  };

  $scope.displayReason = function (_q) {
    if ($scope.quiz.questions[_q].qtype === "single" && $scope.answersRegister[_q].length > 0)
      return true;
    else
      return false;
  };
  $scope.displayFeedback = function (_q) {
    return $scope.correctRegister[_q];
  };

  $scope.selectOption = function (p, i) {
    $scope.answersRegister[p] = [i];

    if (angular.equals($scope.answersRegister[p], $scope.quiz.questions[p].correct))
      $scope.correctRegister[p] = true;
    else {
      $scope.correctRegister[p] = false;
    }
    console.log($scope.answersRegister[p]);
  };

  $scope.toggleOption = function (p, index) {
    if ($scope.answersRegister[p].indexOf(index) === -1)
      $scope.answersRegister[p].push(index);
    else {
      let opinReg = $scope.answersRegister[p].indexOf(index);
      $scope.answersRegister[p].splice(opinReg, 1);
    }
    if (angular.equals($scope.answersRegister[p], $scope.quiz.questions[p].correct))
      $scope.correctRegister[p] = true;
    else {
      $scope.correctRegister[p] = false;
    }
    console.log($scope.answersRegister[p]);
  };

  $scope.submitAnswers = function () {
    var data = JSON.stringify({
      "quizid": quizid,
      "answers": $scope.answersRegister,
      "username": loginSvc.getUsername()
    });

    $http.post('/api/quiz/addresponses', data).then(function (response) {
      if (response.data)
        $scope.msg = "Updated";
    }, function (response) {
      $scope.msg = "Error";
      $scope.statusval = response.status;
      $scope.statustext = response.statusText;
      $scope.headers = response.headers();
    });
  }
});
