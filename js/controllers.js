app.controller('homeCtrl', function ($scope, $location, loginSvc) {

  $scope.authorLogin = function (name) {
    loginSvc.authorSignin(name);
  };

  $scope.candidateLogin = function (name) {
    loginSvc.candidateSignin(name)
  }
});


app.controller('mainCtrl', function ($scope, $location, loginSvc) {
  $scope.username = loginSvc.getUsername();
  $scope.currentRole = loginSvc.getCurrentRole();

  $scope.$watch(function () {
    return loginSvc.getUsername();

  }, function (nval, oval) {
    $scope.username = nval;
  });

  $scope.$watch(function () {
    return loginSvc.getCurrentRole();

  }, function (nval, oval) {
    $scope.currentRole = nval;
  });

  $scope.switchRole = function () {
    loginSvc.switchRole();
  };
});


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


app.controller('quizCtrl', function ($scope, $http, $routeParams, quizService, loginSvc) {
  var quizid = $routeParams.quizid;

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
    console.log($scope.answersRegister);
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
