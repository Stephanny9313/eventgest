angular.module('eventgestApp')
  .service('ParticipantService', function($http) {
    const baseUrl = 'http://localhost:8080/api/participants';

    this.list = function() {
      return $http.get(baseUrl);
    };

    this.getById = function(id) {
      return $http.get(baseUrl + '/' + id);
    };

    this.create = function(participant) {
      return $http.post(baseUrl, participant, { 
        headers: { 'Content-Type': 'application/json' } 
      });
    };

    this.update = function(id, participant) {
      return $http.put(baseUrl + '/' + id, participant, {
        headers: { 'Content-Type': 'application/json' }
      });
    };

    this.delete = function(id) {
      return $http.delete(baseUrl + '/' + id);
    };

    this.search = function(query) {
      return $http.get(baseUrl + '/search', {
        params: { q: query }
      });
    };

    this.getParticipantsByEvent = function(eventId) {
      return $http.get(baseUrl + '/event/' + eventId);
    };
  });
