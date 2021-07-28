angular.module("meanGames").controller("GamesController", gameController);

function gameController(GamesFactory) {
    const vm = this;
    GamesFactory.getAllGames().then(function(response) {
        vm.games = response;
    });
}