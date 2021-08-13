angular.module("meanBook").directive("bookRating", BookRating);

function BookRating() {
    return {
        restrict: "E",
        templateUrl: "angularjs-app/book-rating/rating.html ",
        bindToController: true,
        controller: "BookController",
        controllerAs: "vm"
    }
}