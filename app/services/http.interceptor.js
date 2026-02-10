angular.module('eventgestApp')
.factory('HttpInterceptor', function($q, $window) {
    return {
        request: function(config) {
            const token = $window.localStorage.getItem('jwtToken');
            console.log('HttpInterceptor - token from localStorage:', token);
            config.headers = config.headers || {};
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            console.log('HttpInterceptor - outgoing headers:', config.headers);
            return config;
        },
        responseError: function(rejection) {
            console.error('HttpInterceptor - responseError:', rejection);
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
