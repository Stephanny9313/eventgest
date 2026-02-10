angular.module('eventgestApp')
  .service('EventService', function($http) {
    const baseUrl = 'http://localhost:8080/api/events';

    this.list = function(page = 0, size = 10) {
      return $http.get(baseUrl, { params: { page: page, size: size } });
    };

    this.create = function(event) {
      return $http.post(baseUrl, event, { headers: { 'Content-Type': 'application/json' } });
    };

    this.update = function(event) {
      return $http.put(baseUrl + '/' + event.id, event);
    };

    this.delete = function(id) {
      return $http.delete(baseUrl + '/' + id);
    };
  });
