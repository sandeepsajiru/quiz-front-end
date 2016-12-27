app.factory('quizService', ['$http', function ($http) {

  var url = './data/quizzes.json';
  var quizSvc = {};

  getData = function () {
    return $http.get(url).then(function (res) {
      return res.data
    })
  };

  var quizData = getData();
  quizSvc.getAllQuizzes = function () {
    return quizData
  };

  return quizSvc
}]);


app.factory('loginSvc', function () {
  var username = null;
  var currentRole = null;

  return {
    authorSignin: function (_username) {
      console.log(_username);
      currentRole = 'author';
      username = _username;
    },
    candidateSignin: function (_username) {
      currentRole = 'candidate';
      username = _username;
    },
    getCurrentRole: function () {
      return currentRole;
    },
    getUsername: function () {
      return username;
    },
    switchRole: function () {
      if(currentRole === 'author') currentRole = 'candidate'; else currentRole = 'author';
    }
  }
});

app.factory('histSvc', function ($http) {
  var url = './data/history.json';
  var histSvc = {};

  getData = function () {
    return $http.get(url).then(function (res) {
      return res.data
    })
  };

  var histData = getData();
  histSvc.getHistory = function () {
    return histData;
  };

  return histSvc
});
