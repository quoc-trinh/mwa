angular.module("meanBook").factory("BooksFactory", booksFactory);

function booksFactory($http) {
    return {
        getAllBooks: getBooks,
        getOneBook: getBook,
        addOneBook: addBook,
        updateOneBook: updateBook,
        deleteOneBook: deleteBook,
    };

    function addBook(book) {
        return $http.post("api/books", book).then(complete).catch(failed);
    }

    function updateBook(book) {
        return $http.put("api/books/" + book._id, book).then(complete).catch(failed);
    }

    function getBooks() {
        return $http.get("api/books").then(complete).catch(failed);
    }

    function getBook(bookId) {
        return $http.get("api/books/" + bookId).then(complete).catch(failed);
    }

    function deleteBook(bookId) {
        return $http.delete("api/books/" + bookId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    }
}