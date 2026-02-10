// app/controllers/parameter.controller.js
angular.module('eventgestApp')
    .controller('ParameterController', ['ParameterService', function(ParameterService) {
        var vm = this;
        vm.parameters = [];
        vm.newParameter = {};
  $scope.loadParameters = function() {
        ParameterService.getAll().then(function(resp) {
            $scope.parameters = resp.data;
        });
    };

    $scope.updateParameter = function(param) {
        ParameterService.update(param.id, param.value, 1) // userId=1 ejemplo
            .then(function() {
                alert('Parámetro actualizado y registrado en historial');
            });
    };

   
        // Cargar parámetros
        vm.load = function() {
            ParameterService.list().then(function(res) {
                vm.parameters = res.data;
            });
        };

        // Crear parámetro
        vm.create = function() {
            ParameterService.create(vm.newParameter).then(function(res) {
                vm.parameters.push(res.data);
                vm.newParameter = {};
            });
        };

        // Actualizar parámetro
        vm.update = function(param) {
            ParameterService.update(param.id, param).then(function(res) {
                console.log('Actualizado:', res.data);
            });
        };

        // Eliminar parámetro
        vm.delete = function(param) {
            ParameterService.delete(param.id).then(function() {
                vm.parameters = vm.parameters.filter(p => p.id !== param.id);
            });
        };

        // Desactivar parámetro
        vm.deactivate = function(param) {
            ParameterService.deactivate(param.id).then(function(res) {
                param.active = false;
            });
        };

        // Inicializar
        vm.load();
    }]);
