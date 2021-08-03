angular.module("meanBook").controller("RegisterController", RegisterController);

function RegisterController(UserFactory) {
    var vm = this;
    vm.userForm = {};

    vm.register = function() {
        if (vm.userForm.password != vm.passwordRepeat) {
            vm.err = "plase make sure your password match";
        } else {
            UserFactory.register(vm.userForm).then(function(response) {
                console.log(response);
                vm.message = "successful registration";
                vm.err = "";
            })
        }
    }
}