angular.module('eventgestApp')
  .service('RegistrationService', function($http) {
      var baseUrl = 'http://localhost:8080/api/registrations';

      this.list = function() {
          return $http.get(baseUrl);
      };

      this.register = function(registration) {
          return $http.post(baseUrl, registration, {
              headers: { 'Content-Type': 'application/json' }
          });
      };

      this.getEvents = function() {
          return $http.get('http://localhost:8080/api/events');
      };

      this.getParticipants = function() {
          return $http.get('http://localhost:8080/api/participants');
      };

      this.delete = function(id) {
          return $http.delete(baseUrl + '/' + id);
      };
  });
