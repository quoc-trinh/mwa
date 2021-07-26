angular.module("myMemeApp").controller("MemeController", memeController);

function memeController(MemeFactory) {
    const vm = this;
    vm.meme = "Hello home";
    MemeFactory.memes().then(function(response) {
        vm.meme = response.data.memes[getRandomInt(50)];
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}