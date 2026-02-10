angular.module('eventgestApp')
  .controller('AuditController', function(AuditService) {
    var vm = this;

    vm.audits = [];
    vm.userId = null;
    vm.dateFrom = null;
    vm.dateTo = null;

    // Cargar todas las auditorías
    vm.loadAudits = function() {
      AuditService.getAll().then(function(resp) {
        vm.audits = resp.data;
      }, function(err) {
        console.error("Error cargando auditorías:", err);
      });
    };

    // Cargar auditorías por usuario
    vm.loadByUser = function() {
      if (!vm.userId) return;
      AuditService.getByUser(vm.userId).then(function(resp) {
        vm.audits = resp.data;
      }, function(err) {
        console.error("Error cargando auditorías por usuario:", err);
      });
    };

    // Cargar auditorías por rango de fechas
    vm.loadByDateRange = function() {
      if (!vm.dateFrom || !vm.dateTo) return;
      AuditService.getByDateRange(vm.dateFrom, vm.dateTo).then(function(resp) {
        vm.audits = resp.data;
      }, function(err) {
        console.error("Error cargando auditorías por rango:", err);
      });
    };

    // Inicializar
    vm.loadAudits();
});
