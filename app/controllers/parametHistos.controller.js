angular.module('eventgestApp')
  .controller('ParametHistosController', function(ParametHistosService) {
    var vm = this;

    vm.histories = [];
    vm.parameterId = null;
    vm.newChange = {
      userId: null,
      oldValue: '',
      newValue: ''
    };

    // Cargar historial de un parámetro
    vm.loadHistories = function() {
      if (!vm.parameterId) return;
      ParametHistosService.list(vm.parameterId).then(function(resp) {
        vm.histories = resp.data;
      }, function(err) {
        console.error("Error cargando historial:", err);
      });
    };

    // Registrar un nuevo cambio manual
    vm.addChange = function() {
      if (!vm.parameterId || !vm.newChange.userId) return;
      ParametHistosService.registerChange(
        vm.parameterId,
        vm.newChange.userId,
        vm.newChange.oldValue,
        vm.newChange.newValue
      ).then(function() {
        vm.loadHistories(); // recargar después de registrar
        vm.newChange.oldValue = '';
        vm.newChange.newValue = '';
      }, function(err) {
        console.error("Error registrando cambio:", err);
      });
    };
});
