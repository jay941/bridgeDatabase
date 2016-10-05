angular.module('MyApp')
    .controller('projectCtrl', function($scope, $location, $http, $stateParams, toastr) {
        $scope.projectName1 = "";
        $scope.projectName = "";
        $scope.param = $stateParams.param
        $scope.n = $stateParams.n;
        // console.log($scope.param,$scope.n)
        var data = {
            key: $scope.n
        }
        $scope.user = $scope.param;
        console.log('data', data)
        $http.post('http://localhost:3000/retrive', data).success(function(data) {
            console.log(data);
            $scope.projectName1 = data;
            // $location.path('project')  ;
        })
        $scope.createProject = function(projectName) {
            var x = {
                pro: $scope.projectName,
                key: $scope.n
            }
            console.log('project', x)
            $http.post('http://localhost:3000/project', x).success(function(data1) {
                console.log(data1);
                toastr.success(data1);
                $http.post('http://localhost:3000/retrive', data).success(function(data12) {
                    console.log(data12);
                    $scope.projectName1 = data12;
                    // $location.path('project')  ;
                });
            });
        };
        $scope.project = function() {
            $location.path('/project').search({
                param: $scope.param,
                n: $scope.n
            });
        }
    })
    .directive('navHeader', function() {
        return {
            templateUrl: 'partials/nav.html'
        };
    });
