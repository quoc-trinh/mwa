angular.module("meanGames").controller("GamesController", gameController);

function gameController(GamesFactory) {
    const vm = this;
    GamesFactory.getAllGames().then(function(response) {
        vm.games = response;
    });

    vm.newGame = {};
    vm.addGame = function() {
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