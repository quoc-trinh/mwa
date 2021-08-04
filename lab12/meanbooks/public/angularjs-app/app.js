angular.module("meanBook", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider.when("/", {
        templateUrl: "angularjs-app/welcome/welcome.html"
    }).when("/book", {
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