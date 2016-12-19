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

  $scope.$watch(function () {
    return loginSvc.getCurrentRole();

  }, function (nval, oval) {
    $scope.currentRole = nval;
  });

  quizService.getAllQuizzes().then(function (qs) {
    $scope.quizzes = qs;

    $scope.noOfPages = function () {
      return Math.ceil($scope.quizzes.length/$scope.pageLength);
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

    $scope.answersRegister = new Array($scope.quiz.questions.length);
    $scope.answersRegister.fill(-1);
    console.log($scope.answersRegister);
  });

  $scope.quizOngoing = false;

  $scope.startQuiz = function () {
    $scope.quizOngoing = true;
  };

  $scope.selectOption = function (parentIndex, index) {
    $scope.answersRegister[parentIndex] = index;
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
    options: ['','']
  }];

  $scope.addNewOption = function (_ques) {
    $scope.questions[_ques].options.push('');
    // console.log($scope.questions[_ques].options)
  };

  $scope.addNewQuestion = function () {
    $scope.questions.push({
      qtitle: "",
      options: ['','']
    });
  };

  $scope.removeQuestion = function (_ques) {
    $scope.questions.splice(_ques,1);
  };

  $scope.removeOption = function (_ques, _opt) {
    $scope.questions[_ques].qtitle;
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
      options: ['','']
    });
  };

  $scope.removeQuestion = function (_ques) {
    $scope.questions.splice(_ques,1);
  };

  $scope.removeOption = function (_ques, _opt) {
    $scope.questions[_ques].qtitle;
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
