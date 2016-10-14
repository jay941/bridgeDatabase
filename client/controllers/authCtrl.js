angular.module('MyApp').controller('authCtrl', function ($scope, ngDialog,$http) {

    $scope.dis = 'Disabled';
    $scope.dis1 = 'Disabled';
    //function for user creation
    $scope.create = function () {
        var email = this.email;
        var pas = this.pwd;
        var d = new Date().toDateString();
       
        //creating json
        var final = {
            'email': email,
            'password':pas,
            'date': d
        }

             $http.post('http://localhost:3000/createUser', final).success(function(data){

             })
        $scope.user1 = final;
        console.log(final)

    }
    //function for git user
    $scope.git = function () {
        ngDialog.open({ template: 'partials/modal.html', className: 'ngdialog-theme-default' });
        if ($scope.dis == 'Disabled') {
            $scope.dis = 'Enabled';
        }
        else {
            $scope.dis = 'Disabled';

        }

    }
//function for google user
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

