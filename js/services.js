app.factory('quizService', ['$http', function ($http) {

var url = './data/quizzes.json'
var quizSvc = {}

getData = function() {
  return $http.get(url)
}

quizData = getData()

quizSvc.getAllQuizzes = function() {
    return quizData
}

quizSvc.getQuiz = function(quizid) {
  for (var i=0; i < quizData.length; i++)
    if (quizData[i][id] == quizid)
      return quizData[i];
}

return quizSvc
}])
