angular.module('MyApp').controller('storeCtrl', function ($scope, $http, Upload,$stateParams) {
$scope.uploadFiles=function(file){
     $scope.file = file;
     console.log( $scope.file);

      Upload.upload({
                url: 'http://localhost:3000/imageUpload',
                data: {
                    file:  $scope.file,
                    key:$stateParams.ProKey
                }
            }).then(function (response) {
               
                    $scope.result = response.data;
                    console.log("hii", $scope.result);
               
            });
        

    }

    
   
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