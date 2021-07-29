angular.module("meanGames").factory("GamesFactory", booksFactory);

function booksFactory($http) {
    return {
        getAllGames: getGames,
        getOneGame: getGame
    };

    function getGames() {
        return $http.get("api/games").then(complete).catch(failed);
    }

    function getGame(gameId) {
        return $http.get("api/games/" + gameId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    }
}