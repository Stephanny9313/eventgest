angular.module('eventgestApp')
  .controller('ParticipantController', function($scope, $http) {
      var vm = this;

      vm.participants = [];
      vm.editParticipant = {};
      vm.documentTypes = [
          'REGISTRO_CIVIL',
          'TARJETA_DE_IDENTIDAD',
          'CEDULA_DE_CIUDADANIA',
          'CEDULA_DE_EXTRANJERIA',
          'PASAPORTE'
      ];
      vm.showForm = false;
      vm.notification = null;

      const API_URL = 'http://localhost:8080/api/participants';

      // Cargar participantes
      vm.loadParticipants = function() {
          $http.get(API_URL)
              .then(function(response) {
                  vm.participants = response.data;
              })
              .catch(function(error) {
                  console.error('Error cargando participantes:', error);
                  vm.showNotification('❌ Error al cargar participantes', 'error');
              });
      };

      // Crear participante
      vm.createParticipant = function() {
          if (!vm.editParticipant.name || !vm.editParticipant.email) {
              vm.showNotification('⚠️ Nombre y Email son obligatorios', 'error');
              return;
          }

          $http.post(API_URL, vm.editParticipant, { headers: { 'Content-Type': 'application/json' } })
              .then(function() {
                  vm.showNotification('✅ Participante creado', 'success');
                  vm.editParticipant = {};
                  vm.showForm = false;
                  vm.loadParticipants();
              })
              .catch(function(error) {
                  console.error('Error creando participante:', error);
                  vm.showNotification('❌ Error: ' + (error.data?.message || error.statusText), 'error');
              });
      };

      // Actualizar participante
      vm.updateParticipant = function() {
          if (!vm.editParticipant.id) return;
          $http.put(`${API_URL}/${vm.editParticipant.id}`, vm.editParticipant, { headers: { 'Content-Type': 'application/json' } })
              .then(function() {
                  vm.showNotification('✅ Participante actualizado', 'success');
                  vm.editParticipant = {};
                  vm.showForm = false;
                  vm.loadParticipants();
              })
              .catch(function(error) {
                  console.error('Error actualizando participante:', error);
                  vm.showNotification('❌ Error: ' + (error.data?.message || error.statusText), 'error');
              });
      };

      // Abrir formulario en modo edición
      vm.editForm = function(participant) {
          vm.editParticipant = angular.copy(participant);
          vm.showForm = true;
      };

      // Cancelar edición/creación
      vm.cancelEdit = function() {
          vm.editParticipant = {};
          vm.showForm = false;
      };

      // Buscar participantes
      vm.search = function() {
          if (!vm.searchText) { vm.loadParticipants(); return; }
          $http.get(`${API_URL}/search`, { params: { q: vm.searchText } })
              .then(function(resp) {
                  vm.participants = resp.data;
              })
              .catch(function(err) {
                  console.error('Error en búsqueda:', err);
                  vm.showNotification('❌ Error en búsqueda', 'error');
              });
      };

      // Eliminar participante
      vm.deleteParticipant = function(id) {
          if (!confirm('¿Estás seguro de eliminar este participante?')) return;

          $http.delete(`${API_URL}/${id}`)
              .then(function() {
                  vm.showNotification('✅ Participante eliminado', 'success');
                  vm.loadParticipants();
              })
              .catch(function(error) {
                  console.error('Error eliminando:', error);
                  vm.showNotification('❌ Error al eliminar', 'error');
              });
      };

      // Mostrar notificaciones
      vm.showNotification = function(message, type) {
          vm.notification = { message: message, type: type };
          setTimeout(function() { vm.notification = null; }, 3000);
      };

      // Inicializar
      vm.loadParticipants();
  });
