angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider.when("/", {
        templateUrl: "angularjs-app/welcome/welcome.html",
    }).when("/games", {
        templateUrl: "angularjs-app/game-list/games.html",
        controller: "GamesController",
        controllerAs: "vm"
    }).when("/game/:id", {
        templateUrl: "angularjs-app/game-detail/game.html",
        controller: "GameController",
        controllerAs: "vm"
    }).when("/game/update/:id", {
        templateUrl: "angularjs-app/game-detail-update/game.html",
        controller: "GameUpdateController",
        controllerAs: "vm",
        access: { restricted: true }
    }).when("/register", {
        templateUrl: "angularjs-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    }).when("/profile", {
        templateUrl: "angularjs-app/profile/profile.html",
        access: { restricted: true }
    }).otherwise({
        redirectTo: "/"
    });
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root
        }
    });
}