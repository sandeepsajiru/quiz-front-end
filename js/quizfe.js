var app = angular.module('quizApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {

  $routeProvider.when("/", {
    templateUrl: "templates/dashboard.html",
    controller: "homeCtrl"
  }).when("/add", {
    templateUrl: "templates/add.html",
    controller: "addCtrl"
  }).when("/all", {
    templateUrl: "templates/quizlist.html",
    controller: "quizListCtrl"
  }).when("/quiz/:quizid", {
    templateUrl: "templates/quiz.html",
    controller: "quizCtrl"
  }).when("/edit/:quizid", {
    templateUrl: "templates/edit.html",
    controller: "editCtrl"
  }).otherwise({
    redirectTo: '/login'
  });

  $locationProvider.html5Mode(true);
});
