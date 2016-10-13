angular.module('MyApp').controller('authCtrl', function ($scope, ngDialog) {

    $scope.dis = 'Disabled';
     $scope.dis1 = 'Disabled';
    $scope.create = function () {
        var email = this.email;
        var pas = this.pwd;
        var d = new Date().toDateString();

        var final = {
            'email': email,
            'date': d
        }
        $scope.user1 = final;
        console.log(final)

    }
    $scope.git = function () {
        ngDialog.open({ template: 'partials/modal.html', className: 'ngdialog-theme-default' });
        if ($scope.dis == 'Disabled') {
            $scope.dis = 'Enabled';
        }
        else {
        $scope.dis = 'Disabled';

        }

    }

    $scope.google = function () {
        ngDialog.open({ template: 'partials/modal.html', className: 'ngdialog-theme-default' });
        if ($scope.dis1 == 'Disabled') {
            $scope.dis1 = 'Enabled';
        }
        else {
        $scope.dis1 = 'Disabled';

        }

    }
    $scope.a = function () {
        console.log('hii')

    }

});

