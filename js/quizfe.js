var app = angular.module('quizApp', ['ngRoute'])

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/dashboard.html",
    controller: "homeController"
  }).when("/addquiz", {
    templateUrl: "templates/addquiz.html",
    controller: "addQuizController"
  }).when("/quiz", {
    templateUrl: "templates/quiz.html",
    controller: "QuizzerController"
  }).when("/quiz1", {
    templateUrl: "templates/quiz.html",
    controller: "QuizzerController"
  }).when("/quiz2", {
    templateUrl: "templates/quiz.html",
    controller: "QuizzerController"
  }).when("/quiz3", {
    templateUrl: "templates/quiz.html",
    controller: "QuizzerController"
  }).otherwise({
    redirectTo: '/login'
  })
})

app.controller('homeController',['$scope', function($scope){

}])

app.controller('mainController',['$scope', function($scope){
  
}])
