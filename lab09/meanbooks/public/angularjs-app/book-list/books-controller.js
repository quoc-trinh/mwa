angular.module("meanBook").controller("BooksController", bookController);

function bookController(BooksFactory, $route) {
    const vm = this;
    BooksFactory.getAllBooks().then(function(response) {
        vm.books = response;
    });
    vm.newBook = {};

    vm.addBook = () => {
        BooksFactory.addOneBook(vm.newBook).then(function(response) {
            console.log("new book was created");
            $route.reload();
        })
    };
    vm.deleteBook = (bookId) => {
        BooksFactory.deleteOneBook(bookId).then(function(response) {
            console.log("new book was created");
        })
    };
}