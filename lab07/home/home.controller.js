angular.module("myMemeApp").controller("HomeController", function(MemeFactory) {
    const vm = this;
    vm.meme = "Hello home";
    MemeFactory.memes().then(function(response) {
        vm.memes = response.data.memes;
    })
});