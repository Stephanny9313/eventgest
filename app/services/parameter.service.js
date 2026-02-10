// app/services/parameter.service.js
angular.module('eventgestApp')
    .service('ParameterService', ['$http', function($http) {

        this.list = function() {
            return $http.get('/api/parameters');
        };

        this.create = function(param) {
            return $http.post('/api/parameters', param);
        };

        this.update = function(id, param) {
            return $http.put('/api/parameters/' + id, param);
        };

        this.delete = function(id) {
            return $http.delete('/api/parameters/' + id);
        };

        this.deactivate = function(id) {
            return $http.patch('/api/parameters/' + id + '/deactivate');
        };
        this.getAll = function() {
        return $http.get('http://localhost:8080/api/parameters');
    };

    this.update = function(id, newValue, userId) {
        return $http.put('http://localhost:8080/api/parameters/' + id, null, {
            params: { newValue: newValue, userId: userId }
        });
    };
    }]);
