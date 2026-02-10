angular.module('eventgestApp')
  .service('AuditService', function($http) {
    const baseUrl = 'http://localhost:8080/api/audits';

    // Obtener todas las auditorías
    this.getAll = function() {
      return $http.get(baseUrl);
    };

    // Obtener auditorías por usuario
    this.getByUser = function(userId) {
      return $http.get(baseUrl + '/user/' + userId);
    };

    // Obtener auditorías por rango de fechas
    this.getByDateRange = function(from, to) {
      return $http.get(baseUrl + '/range', { params: { from: from, to: to } });
    };
});
