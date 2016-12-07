app.factory('quizService', ['$http', function ($http) {

    var url = './data/quizzes.json'
    var quizSvc = {}

    getData = function () {
        return $http.get(url).then(function (res) {
            return res.data
        })
    }

    var quizData = getData()
    quizSvc.getAllQuizzes = function () {
        return quizData
    }

    return quizSvc
}])
