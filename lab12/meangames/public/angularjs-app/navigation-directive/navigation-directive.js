angular.module("meanGames").directive("gameNavigation", gamesNavigation);

function gamesNavigation() {
    return {
        restrict: "E",
        templateUrl: "angularjs-app/navigation-directive/navigation-directive.html",
        scope: {
            stars: "@"
        }
    };
}