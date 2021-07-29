angular.module("meanGames").controller("GameController", bookController);

function bookController(GamesFactory, $routeParams) {
    const vm = this;
    GamesFactory.getOneGame($routeParams.id).then(function(response) {
        vm.game = response;
        vm.rating = new Array(response.rate);
    });
}