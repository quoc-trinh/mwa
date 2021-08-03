angular.module("meanBook").controller("BooksController", bookController);

function bookController(BooksFactory, $route, AuthFactory) {
    const vm = this;
    BooksFactory.getAllBooks().then(function(response) {
        vm.books = response;
    });
    vm.isLoggedIn = function() {
        return AuthFactory.isLoggedIn;
    }
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