angular.module("meanBook").controller("BookController", gameController);

function gameController(BooksFactory, $routeParams) {
    const vm = this;
    BooksFactory.getOneBook($routeParams.id).then(function(response) {
        vm.book = response;
        vm.rating = new Array(response.rate);
    });
}