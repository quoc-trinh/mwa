angular.module("meanBook").directive("bookNavigation", booksNavigation);

function booksNavigation() {
    return {
        restrict: "E",
        templateUrl: "angularjs-app/navigation-directive/navigation-directive.html",
        scope: {
            stars: "@"
        }
    };
}