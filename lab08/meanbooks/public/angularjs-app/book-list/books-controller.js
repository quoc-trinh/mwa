angular.module("meanBook").controller("BooksController", bookController);

function bookController(BooksFactory) {
    const vm = this;
    BooksFactory.getAllBooks().then(function(response) {
        vm.books = response;
    });
}