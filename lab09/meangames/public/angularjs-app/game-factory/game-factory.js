angular.module("meanGames").factory("GamesFactory", booksFactory);

function booksFactory($http) {
    return {
        getAllGames: getGames,
        getOneGame: getGame,
        addOneGame: addGame,
        updateOneGame: updateGame,
        deleteOneGame: deleteGame
    };

    function addGame(game) {
        return $http.post("api/games", game).then(complete).catch(failed);
    }

    function getGames() {
        return $http.get("api/games").then(complete).catch(failed);
    }

    function getGame(gameId) {
        return $http.get("api/games/" + gameId).then(complete).catch(failed);
    }

    function updateGame(updateOneGame) {
        return $http.put("api/games/" + updateOneGame._id, updateOneGame).then(complete).catch(failed);
    }

    function deleteGame(gameId) {
        return $http.delete("api/games/" + gameId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    }
}