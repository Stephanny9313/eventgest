angular.module('eventgestApp')
  .service('AuthService', function($http, $window) {

    const baseUrl = 'http://localhost:8080/api/auth';

    // Hacer login y guardar token en localStorage
    this.login = function(credentials) {
        return $http.post(baseUrl + '/login', credentials)
            .then(resp => {
                const token = resp.data.token;
                $window.localStorage.setItem('jwtToken', token);
                return token;
            });
    };

    // Obtener token guardado
    this.getToken = function() {
        return $window.localStorage.getItem('jwtToken');
    };

    // Limpiar token al cerrar sesión
    this.logout = function() {
        $window.localStorage.removeItem('jwtToken');
    };

    // Configuración para peticiones autorizadas
    this.getAuthHeaders = function() {
        const token = this.getToken();
        return token ? { 'Authorization': 'Bearer ' + token } : {};
    };

});
