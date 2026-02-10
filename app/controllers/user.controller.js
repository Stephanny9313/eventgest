angular.module('eventgestApp')
    .controller('UserController', ['UserService', function(UserService) {
        var vm = this;

        vm.users = [];
        vm.newUser = {};        // Para crear
        vm.selectedUser = {};   // Para editar

        // =========================
        // Cargar todos los usuarios
        // =========================
        vm.loadUsers = function() {
            UserService.getAll().then(function(response) {
                vm.users = response.data;
            }, function(error) {
                console.error('Error cargando usuarios:', error);
            });
        };

        // =========================
        // Crear usuario
        // =========================
        vm.createUser = function() {
            UserService.create(vm.newUser).then(function(response) {
                vm.newUser = {};
                vm.loadUsers();
            }, function(error) {
                console.error('Error creando usuario:', error);
            });
        };

        // =========================
        // Actualizar usuario
        // =========================
        vm.updateUser = function() {
            UserService.update(vm.selectedUser).then(function(response) {
                vm.selectedUser = {};
                vm.loadUsers();
            }, function(error) {
                console.error('Error actualizando usuario:', error);
            });
        };

        // =========================
        // Eliminar usuario
        // =========================
        vm.deleteUser = function(userId) {
            if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
            UserService.delete(userId).then(function(response) {
                vm.loadUsers();
            }, function(error) {
                console.error('Error eliminando usuario:', error);
            });
        };

        // =========================
        // Asignar rol
        // =========================
        vm.assignRol = function(userId, rolId) {
            UserService.assignRol(userId, rolId).then(function(response) {
                vm.loadUsers();
            }, function(error) {
                console.error('Error asignando rol:', error);
            });
        };

        // Inicializar
        vm.loadUsers();
    }]);
