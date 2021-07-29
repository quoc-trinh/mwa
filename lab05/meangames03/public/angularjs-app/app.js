angular.module("meanGames", [ngRoute]).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "",
        controller: "",
        controllerAs: ""
    });
}