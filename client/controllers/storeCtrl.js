angular.module('MyApp').controller('storeCtrl', function ($scope, $http, Upload,$stateParams) {
$scope.uploadFiles=function(files){
     $scope.files = files;
     console.log( $scope.files);

        if (files && files.length) {
            Upload.upload({
                url: 'http://localhost:3000/imageUpload',
                data: {
                    files: files,
                    key:$stateParams.ProKey
                }
            }).then(function (response) {
               
                    $scope.result = response.data;
                    console.log("hii", $scope.result);
               
            });
        }
 $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };    
    }
     $scope.checkAll = function () {
         console.log('call')
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };    
     $scope.personalDetails = [
        {
            'fname':'Muhammed',
            'lname':'Shanid',
            'email':'shanid@shanid.com'
        },
        {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
         {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
         {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
         {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
         {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
         {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
        {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
        {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
        {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
        {
            'fname':'Roy',
            'lname':'Mathew',
            'email':'roy@roy.com'
        }];
         $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.personalDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.personalDetails = newDataList;
        };
   

})