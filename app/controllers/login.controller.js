angular.module('eventgestApp')
.controller('LoginController', function(LoginService, $window) {
    var vm = this;

    vm.credentials = {
        email: '',
        password: ''
    };

    vm.notification = null;

    vm.login = function() {
        vm.notification = null;

        LoginService.login(vm.credentials)
            .then(function(resp) {
                // Login exitoso
                vm.notification = {
                    type: 'success',
                    message: '¡Bienvenido ' + resp.data.email + '!'
                };

                // Guardar token si lo devuelve el backend
                if(resp.data.token){
                    localStorage.setItem('jwtToken', resp.data.token);
                }

                // Redirigir a dashboard después de 1 segundo
                setTimeout(function() {
                    $window.location.href = 'dashboard.html';
                }, 1000);

            })
            .catch(function(err) {
                // Login fallido
                vm.notification = {
                    type: 'error',
                    message: err.data?.message || 'Usuario o contraseña incorrectos.'
                };
            });
    };
});
