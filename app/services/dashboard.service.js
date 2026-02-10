angular.module('eventgestApp')
  .service('DashboardService', function($http) {
    const baseUrl = 'http://localhost:8080/api';

    this.getEvents = function() {
      return $http.get(baseUrl + '/events');
    };

    this.getEventTypes = function() {
      return $http.get(baseUrl + '/event-types');
    };

    this.getPrograms = function() {
      return $http.get(baseUrl + '/programs');
    };

    this.getAudits = function() {
      return $http.get(baseUrl + '/audits/top5');
    };

    this.updateEvent = function(event) {
      return $http.put(baseUrl + '/events/' + event.id, event);
    };

    this.deleteEvent = function(id) {
      return $http.delete(baseUrl + '/events/' + id);
    };
  });
