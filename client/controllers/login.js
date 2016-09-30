angular.module('MyApp')
    .controller('LoginCtrl', function($scope, $location, $auth, toastr) {
        $scope.login = function() {
            $auth.login($scope.user).then(function(data) {
                    console.log('data ', data.data.user.displayName)
                    toastr.success('You have successfully signed in!');
                    $location.path('/profile').search({
                        param: data.data.user.displayName,
                        n: data.data.user.email
                    });

                })
                .catch(function(error) {
                    toastr.error(error.data.message, error.status);
                });
        };
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    toastr.success('You have successfully signed in with ' + provider + '!');
                    $location.path('/');
                })
                .catch(function(error) {
                    if (error.message) {
                        // Satellizer promise reject error.
                        toastr.error(error.message);
                    } else if (error.data) {
                        // HTTP response error from server
                        toastr.error(error.data.message, error.status);
                    } else {
                        toastr.error(error);
                    }
                });
        };
    });
