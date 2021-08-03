angular.module("meanGames").factory("UserFactory", UserFactory);

function UserFactory($http) {
    return {
        register: register,
        login: login
    };

    function register(post) {
        return $http.post("/api/users/register", post).then(complete).catch(failed);
    }

    function login(post) {
        return $http.post("/api/users/login", post).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }

}