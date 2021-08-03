angular.module("meanBook").factory("AuthInterceptor", Authinterceptor);

function Authinterceptor($location, $q, $window, AuthFactory) {
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config) {
        config.headers == config.headers || {};
        console.log("Authinterceptor");
        if ($window.sessionStorage.token) {
            config.headers.authorization = "Bearer " + $window.sessionStorage.token;
        }
        return config;
    }

    function response(response) {
        if (response.status == 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            AuthFactory.isLoggedIn == true;
        }
        if (response.status == 400) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response)
    }

    function responseError(rejection) {
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path("/");
        }
        return $q.reject(rejection);
    }
}