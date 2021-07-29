angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/game-list/games.html",
        controller: "GamesController",
        controllerAs: "vm"
    }).when("/game/:id", {
        templateUrl: "angularjs-app/game-detail/game.html",
        controller: "GameController",
        controllerAs: "vm"
    }).when("/game/update/:id", {
        templateUrl: "angularjs-app/game-detail-update/game.html",
        controller: "GameUpdateController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    });
}