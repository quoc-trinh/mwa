angular.module("meanBook", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/book-list/books.html",
        controller: "BooksController",
        controllerAs: "vm"
    }).when("/book/:id", {
        templateUrl: "angularjs-app/book-detail/book.html",
        controller: "BookController",
        controllerAs: "vm"
    }).when("/book/update/:id", {
        templateUrl: "angularjs-app/book-detail-update/book.html",
        controller: "BookUpdateController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    });
}