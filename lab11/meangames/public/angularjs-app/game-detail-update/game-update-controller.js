angular.module("meanGames").controller("GameUpdateController", gameUpdateController);

function gameUpdateController(GamesFactory, $routeParams) {
    const vm = this;

    GamesFactory.getOneGame($routeParams.id).then(function(response) {
        vm.game = response;
        vm.rating = new Array(response.rate);
    });

    vm.game = {};

    vm.updateGame = () => GamesFactory.updateOneGame(vm.game).then(function(response) {
        console.log("Book is updated");
    }).catch((err) => {
        console.log("Cannot update book", err);
    });;
}