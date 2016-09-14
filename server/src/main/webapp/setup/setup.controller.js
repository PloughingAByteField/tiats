(function() {
    angular.module('setupApp').controller('userController', UserController);

    function UserController($scope, $log, User, Redirect) {
        $log.debug("userController");

        var vm = this;

        vm.addUserForm = {};
        vm.user = {};

        vm.addUser = function(user) {
            $log.debug("got user " + user.user_name + " password " + user.password);

            User.save(user).$promise.then(function() {
                vm.user = {};
                vm.addUserForm.$setPristine();
                vm.addUserForm.$setUntouched();

                Redirect.redirect("/");

            }, function(errResponse) {
                $log.warn("Failed to add user", errResponse);
                vm.addUserForm.$invalid = true;
            });
        };
    };
})();