angular.module('bridgedb')
    .controller('projectCtrl', function($scope, $location, $http, loginService, $stateParams) {
        $scope.projectName1 = "";
        $scope.projectName = "";
        $scope.param = $stateParams.param;
        var data = {
            key: $scope.param
        }
        $scope.user = $scope.param;
        // console.log('data', data);
        //retrive and save data in the variable
        $http.post('http://localhost:8091/retrive', data).success(function(data) {
            // console.log(data);
            $scope.projectName1 = data;
            // $location.path('project')  ;
        });
        //create new project
        $scope.createProject = function(projectName) {
            var x = {
                pro: $scope.projectName,
                key: $scope.param
            }
            // alert(x.pro);
            $http.post('http://localhost:8091/project', x).success(function(data1) {
                // alert(data1);
                $http.post('http://localhost:8091/retrive', data).success(function(data12) {
                    // alert(data12);
                    $scope.projectName1 = data12;
                    // $location.path('project')  ;
                });
            });
        };
        //route to the project page
        $scope.project = function() {
            $location.path('project');
        };
        $scope.projectAuth = function(){

        }
    })
    .directive('navHeader', function() {
        return {
            templateUrl: 'views/navHeader.html'
        };
    });
