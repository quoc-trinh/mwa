angular.module("meanGames").controller("GamesController", gameController);

function gameController(GamesFactory, AuthFactory) {
    const vm = this;
    GamesFactory.getAllGames().then(function(response) {
        vm.games = response;
    });
    vm.isLoggedIn = function() {
        return AuthFactory.isLoggedIn;
    }
    vm.newGame = {};
    vm.addGame = () => {
        console.log("game form");

        if (vm.gameForm.$valid) {
            console.log("game form", vm.newGame);
            GamesFactory.addOneGame(vm.newGame).then((response) => {
                console.log(`Game created`);
            }).catch((err) => {
                console.log(`Error during creating game`, err);
            });
        }
    }
    vm.deleteGame = function(gameId) {
        if (gameId) {
            GamesFactory.deleteOneGame(gameId).then(() => {
                console.log(`Game ${gameId} deleted`);
            });
        }
    }
}