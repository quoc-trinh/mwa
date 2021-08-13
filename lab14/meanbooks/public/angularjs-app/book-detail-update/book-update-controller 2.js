angular.module("meanBook").controller("BookUpdateController", bookUpdateController);

function bookUpdateController(BooksFactory, $routeParams) {
    const vm = this;
    vm.book = {};
    BooksFactory.getOneBook($routeParams.id).then(function(response) {
        vm.book = response;
        vm.rating = new Array(response.rate);
    });

    vm.updateBook = () => BooksFactory.updateOneBook(vm.book).then(function(response) {
        console.log("Book is updated");
    }).catch((err) => {
        console.log("Cannot update book", err);
    });
}