angular.module('MyApp').controller('authCtrl', function ($scope, ngDialog, $http, $stateParams, toastr) {

    $scope.dis = 'Disabled';
    $scope.dis1 = 'Disabled';
    $scope.ProKey = $stateParams.ProKey;
     var udata={
         ProKey:  $scope.ProKey
     }
    //Retriving User data
    $http.post('http://localhost:3000/retriveUser', udata).success(function (data12) {
       
            $scope.user12 = data12;
            console.log("data1416 ",data12);
        

    });

    //function for user creation
    $scope.create = function () {
        var email = this.email;
        var pas = this.pwd;
        var d = new Date().toDateString();

        //creating json
        var final = {
            'email': email,
            'password': pas,
            'ProKey': $scope.ProKey,
            'date': d
        }
    $http.post('http://localhost:3000/createUser', final).success(function (data) {
            // toastr.success(data);
            $scope.user12 = data
                console.log(JSON.stringify(da5801d95484ca3d1809962ae0.jayta));
            // $http.post('http://localhost:3000/retrivedata-dismiss="modal"User', udata).success(function (data12) {
               
            //         $scope.user12 = data12;
            //         console.log($scope.user12);
                

            // });

        });


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
    $scope.closeAll = function () {
        var clientid=this.cid;
        var clientsecret=this.cs;

        var saveData={
            ' clientid': clientid,
            'clientsecret':clientsecret

        }
      
        console.log(saveData)
      
  ngDialog.closeAll();
    }

   

});

