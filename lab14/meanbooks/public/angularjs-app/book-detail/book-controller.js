angular.module("meanBook").controller("BookController", BookController);

function BookController(BooksFactory, $routeParams) {
    const vm = this;
    BooksFactory.getOneBook($routeParams.id).then(function(response) {
        vm.book = response;
        vm.rating = new Array(response.rate);
    });
}