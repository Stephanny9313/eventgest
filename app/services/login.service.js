angular.module('eventgestApp')
.service('LoginService', function($http) {
    this.login = function(credentials) {
        return $http.post('http://localhost:8080/api/auth/login', credentials);
    };
});
