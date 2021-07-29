angular.module("meanGames").controller("GamesController", bookController);

function bookController(GamesFactory) {
    const vm = this;
    GamesFactory.getAllGames().then(function(response) {
        vm.games = response;
    });
}