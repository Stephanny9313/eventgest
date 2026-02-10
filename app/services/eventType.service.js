angular.module('eventgestApp')
  .service('EventTypeService', function($http) {
    const baseUrl = 'http://127.0.0.1:8080/api/event-types';

    this.list = function() {
      return $http.get(baseUrl);
    };

    this.getById = function(id) {
      return $http.get(baseUrl + '/' + id);
    };

    this.create = function(dto) {
      return $http.post(baseUrl, dto, { headers: { 'Content-Type': 'application/json' } });
    };

    this.update = function(id, dto) {
      return $http.put(baseUrl + '/' + id, dto, { headers: { 'Content-Type': 'application/json' } });
    };

    this.delete = function(id) {
      return $http.delete(baseUrl + '/' + id);
    };

    return this;
  });
