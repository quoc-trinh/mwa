angular.module("myMemeApp").factory("MemeFactory", memeFactory);

function memeFactory($http) {
    return {
        memes: getMemes
    };

    function getMemes() {
        return $http.get("https://api.imgflip.com/get_memes").then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    }
}