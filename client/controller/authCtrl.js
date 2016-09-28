angular.module('bridgedb')
  .controller('authCtrl', function ($scope, $location, $auth, toaster) {
    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(function () {
        toaster.success('You have successfully signed in with ' + provider + '!');
        console.log('You have successfully signed in with ' + provider + '!');
        $location.path('/profile');
      })
        .catch(function (error) {
          if (error.message) {
            console.log(error.message)
            // Satellizer promise reject error.
            toaster.error(error.message);
          } else if (error.data) {
            // HTTP response error from server
            toaster.error(error.data.message, error.status);
            console.log(error.data.message, error.status)
          } else {
            toaster.error(error);
          }
        });
    };
  })
