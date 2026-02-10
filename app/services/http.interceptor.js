angular.module('eventgestApp')
.factory('HttpInterceptor', function($q, $window) {
    return {
        request: function(config) {
            const token = $window.localStorage.getItem('jwtToken');
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                // Token expirado o inválido
                $window.localStorage.removeItem('jwtToken');
                $window.location.href = 'login.html';
            }
            return $q.reject(rejection);
        }
    };
})
.config(function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
});
