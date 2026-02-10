angular.module('eventgestApp')
  .service('ParametHistosService', function($http) {
    const baseUrl = 'http://localhost:8080/api/paramethistos';

    // Listar historial de un parámetro
    this.list = function(parameterId) {
      return $http.get(baseUrl, { params: { parameterId: parameterId } });
    };

    // Registrar cambio de parámetro
    this.registerChange = function(parameterId, userId, oldValue, newValue) {
      return $http.post(baseUrl, null, {
        params: {
          parameterId: parameterId,
          userId: userId,
          oldValue: oldValue,
          newValue: newValue
        }
      });
    };
});
