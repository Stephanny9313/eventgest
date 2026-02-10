angular.module('eventgestApp')
  .service('ProgramService', function($http) {
    const baseUrl = 'http://127.0.0.1:8080/api/programs';

    this.list = function() {
      return $http.get(baseUrl);
    };

    this.getById = function(id) {
      return $http.get(baseUrl + '/' + id);
    };

    this.create = function(program) {
      return $http.post(baseUrl, program, { 
        headers: { 'Content-Type': 'application/json' } 
      });
    };

    this.update = function(id, program) {
      return $http.put(baseUrl + '/' + id, program, { 
        headers: { 'Content-Type': 'application/json' } 
      });
    };

    this.delete = function(id) {
      return $http.delete(baseUrl + '/' + id);
    };

    return this;
  });
