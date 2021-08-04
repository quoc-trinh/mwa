angular.module("meanBook").controller("LoginController", LoginController);

function LoginController($location, $window, AuthFactory, UserFactory, jwtHelper) {
    var vm = this;
    vm.isLoggedIn = function() {
        return AuthFactory.isLoggedIn;
    }
    vm.credential = {};
    vm.login = function() {

        UserFactory.login(vm.credential).then(function(response) {
            if (response.success) {
                $window.sessionStorage.token = response.token;
                AuthFactory.isLoggedIn = true;
                var token = $window.sessionStorage.token;
                var decodedToken = jwtHelper.decodeToken(token);
                vm.loggedInUser = decodedToken.username;
            }
        })

    }
    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path("/")
    }
}