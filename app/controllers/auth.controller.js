angular.module('eventgestApp')
  .controller('AuthController', function(AuthService, $window) {
      var vm = this;

      vm.credentials = {
          email: '',
          password: ''
      };

      vm.error = '';

      vm.login = function() {
          AuthService.login(vm.credentials)
              .then(function(token) {
                  console.log('Login exitoso, token:', token);
                  vm.error = '';
                  // Redirigir a la página principal de la app
                  $window.location.href = 'dashboard.html';
              })
              .catch(function(err) {
                  console.error('Error login:', err);
                  vm.error = 'Usuario o contraseña incorrectos';
              });
      };
  });
