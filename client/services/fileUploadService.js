angular.module('MyApp').service('fileUploadService', function($http, $q) {

this.uploadFileToUrl = function(file, uploadUrl) {
    //FormData, object of key/value pair for form fields and values
    console.log(file);
    // var fileFormData = new FormData();
    // fileFormData.append('file', file);

    var deffered = $q.defer();
    $http.post(uploadUrl, file, {
        transformRequest: angular.identity,
        headers: {
            'Content-Type': undefined
        }

    }).success(function(response) {
        deffered.resolve(response);

    }).error(function(response) {
        deffered.reject(response);
    });

    return deffered.promise;
}
});
