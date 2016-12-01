var app = angular.module('quizApp', ['ngRoute'])

app.config(function ($routeProvider, $locationProvider) {

  $routeProvider.when("/", {
    templateUrl: "templates/dashboard.html",
    controller: "homeController"
  }).when("/addquiz", {
    templateUrl: "templates/addquiz.html",
    controller: "addQuizController"
  }).when("/all", {
    templateUrl: "templates/quizlist.html",
    controller: "quizListController"
  }).when("/quiz/:quizid", {
    templateUrl: "templates/quizlist.html",
    controller: "quizController"
  }).otherwise({
    redirectTo: '/login'
  })

  $locationProvider.html5Mode(true);
})
