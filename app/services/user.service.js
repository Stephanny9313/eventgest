angular.module('eventgestApp')
    .factory('UserService', ['$http', function($http) {
        const baseUrl = 'http://localhost:8080/api/users';

        return {
            // Obtener todos los usuarios
            getAll: function() {
                return $http.get(baseUrl);
            },

            // Obtener usuario por ID
            getById: function(id) {
                return $http.get(`${baseUrl}/${id}`);
            },

            // Crear nuevo usuario
            create: function(user) {
                return $http.post(baseUrl, user);
            },

            // Actualizar usuario existente
            update: function(user) {
                return $http.put(`${baseUrl}/${user.id}`, user);
            },

            // Eliminar usuario
            delete: function(id) {
                return $http.delete(`${baseUrl}/${id}`);
            },

            // Asignar rol a usuario
            assignRol: function(userId, rolId) {
                return $http.patch(`${baseUrl}/${userId}/rol/${rolId}`);
            }
        };
    }]);
