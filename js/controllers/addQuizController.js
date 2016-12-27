/**
 * Created by Abhinav on 27-12-2016.
 */

app.controller('addCtrl', function ($scope, $http, loginSvc) {

  $scope.quizname = '';
  $scope.quizlevel = '';
  $scope.quizdomain = '';
  $scope.questions = [{
    qtitle: "",
    qtype: "single",
    qimg: "",
    qvideo: "",
    qcode: "",
    correct: [0],
    reason: "",
    options: ['', '']
  }];

  $scope.addNewOption = function (_ques) {
    $scope.questions[_ques].options.push('');
    // console.log($scope.questions[_ques].options)
  };

  $scope.addNewQuestion = function (_qtype) {
    $scope.questions.push({
      qtitle: "",
      qid: 0,
      qtype: _qtype,
      files: [],
      qcode: null,
      correct: [],
      reason: "",
      options: ['', '']
    });
  };

  $scope.$on("addedFile", function (event, args) {
    $scope.$apply(function () {
      $scope.questions[args.q].files.push(args.file);
    });
  });

  $scope.setCorrect = function (_ques, _opt) {
    if ($scope.questions[_ques].qtype == "single")
      $scope.questions[_ques].correct = [_opt];
    else {
      if ($scope.questions[_ques].correct.indexOf(_opt) === -1)
        $scope.questions[_ques].correct.push(_opt);
      else {
        let opinReg = $scope.questions[_ques].correct.indexOf(_opt);
        $scope.questions[_ques].correct.splice(opinReg, 1);
      }
    }
    console.log($scope.questions[_ques].correct)
  };

  $scope.removeQuestion = function (_ques) {
    $scope.questions.splice(_ques, 1);
  };

  $scope.removeOption = function (_ques, _opt) {
    $scope.questions[_ques].options.splice(_opt, 1);
  };

  $scope.getLevel = function (_level) {
    $scope.quizlevel = _level;
    console.log(_level);
  };

  $scope.submit = function () {
    var data = JSON.stringify({
      "name": $scope.quizname,
      "level": $scope.quizlevel,
      "authorUsername": loginSvc.getUsername(),
      "domain": $scope.quizdomain,
      "questions": $scope.questions
    });

    $http.post('/api/quiz/add', data).then(function (response) {
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
