var app = angular.module('quizApp', ['ngRoute'])

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/dashboard.html",
    controller: "homeController"
  }).when("/addquiz", {
    templateUrl: "templates/addquiz.html",
    controller: "addQuizController"
  }).when("/all", {
    templateUrl: "templates/quizlist.html",
    controller: "quizzerController"
  }).otherwise({
    redirectTo: '/login'
  })
})
