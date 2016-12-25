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

app.directive('uploadFiles', function () {
  return {
    scope: true,
    link: function (scope, el, attrs) {
      el.bind('change', function (event) {
        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
          //emit event upward
          scope.$emit("addedFile", { file: files[i], q: attrs.name });
        }
      });
    }
  };
});
