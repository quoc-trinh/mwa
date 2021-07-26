angular.module("myMemeApp", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/meme", {
        templateUrl: "meme/meme.html",
        controller: "MemeController",
        controllerAs: "memeCtrl"
    }).
    when("/", {
        templateUrl: "/home/home.html",
        controller: "HomeController",
        controllerAs: "homeCtrl"
    }).otherwise({
        redirectTo: "/"
    });
}