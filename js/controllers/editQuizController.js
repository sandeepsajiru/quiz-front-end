/**
 * Created by Abhinav on 27-12-2016.
 */

app.controller('editCtrl', function ($scope, $http, $routeParams, quizService, loginSvc) {

  var quizid = $routeParams.quizid;
  var quiz = null;

  quizService.getAllQuizzes().then(function (qarray) {
    console.log("8989");
    for (var i = 0; i < qarray.length; i++)
      if (qarray[i].id == quizid) {
        quiz = qarray[i];
        break
      }

    $scope.quizname = quiz.name;
    $scope.questions = quiz.questions;
    $scope.quizlevel = quiz.level;
    $scope.quizdomain = quiz.domain;
  });

  $scope.addNewOption = function (_ques) {
    $scope.questions[_ques].options.push('');
    // console.log($scope.questions[_ques].options)
  };

  $scope.addNewQuestion = function () {
    $scope.questions.push({
      qtitle: "",
      options: ['', '']
    });
  };

  $scope.removeQuestion = function (_ques) {
    $scope.questions.splice(_ques, 1);
  };

  $scope.removeOption = function (_ques, _opt) {
    $scope.questions[_ques].options.splice(_opt, 1);
  };

  $scope.update = function () {

    var data = JSON.stringify({
      "id": quizid,
      "name": $scope.quizname,
      "level": $scope.quizlevel,
      "authorUsername": loginSvc.getUsername(),
      "domain": $scope.quizdomain,
      "questions": $scope.questions
    });

    $http.post('/api/quiz/update', data).then(function (response) {
      if (response.data)
        $scope.msg = "Updated";
    }, function (response) {
      $scope.msg = "Error";
      $scope.statusval = response.status;
      $scope.statustext = response.statusText;
      $scope.headers = response.headers();

    });
  };
});
