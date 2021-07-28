angular.module("meanBook").factory("BooksFactory", booksFactory);

function booksFactory($http) {
    return {
        getAllBooks: getBooks,
        getOneBook: getBook
    };

    function getBooks() {
        return $http.get("api/books").then(complete).catch(failed);
    }

    function getBook(bookId) {
        return $http.get("api/books/" + bookId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    }
}