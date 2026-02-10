angular.module('eventgestApp')
  .controller('ParticipantController', function($scope, $http) {
      var vm = this;
      
      vm.participants = [];
      vm.participant = {};
      vm.editingId = null;
      vm.notification = null;

      const API_URL = 'http://localhost:8080/api/participants';

      // Cargar participantes
      vm.loadParticipants = function() {
          $http.get(API_URL)
              .then(function(response) {
                  vm.participants = response.data;
                  console.log('Participantes cargados:', vm.participants);
              })
              .catch(function(error) {
                  console.error('Error cargando participantes:', error);
                  vm.showNotification('❌ Error al cargar participantes', 'error');
              });
      };

      // Crear o actualizar participante
      vm.saveParticipant = function() {
          if (!vm.participant.name || !vm.participant.email) {
              vm.showNotification('⚠️ Nombre y Email son obligatorios', 'error');
              return;
          }

          const method = vm.editingId ? 'PUT' : 'POST';
          const url = vm.editingId ? `${API_URL}/${vm.editingId}` : API_URL;

          $http({
              method: method,
              url: url,
              data: vm.participant,
              headers: { 'Content-Type': 'application/json' }
          })
          .then(function(response) {
              vm.showNotification('✅ Participante guardado exitosamente', 'success');
              vm.participant = {};
              vm.editingId = null;
              vm.loadParticipants();
          })
          .catch(function(error) {
              console.error('Error creando participante:', error);
              vm.showNotification('❌ Error: ' + (error.data?.message || error.statusText), 'error');
          });
      };

      // Editar participante
      vm.editParticipant = function(participant) {
          vm.participant = angular.copy(participant);
          vm.editingId = participant.id;
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
          setTimeout(function() {
              vm.notification = null;
          }, 3000);
      };

      // Inicializar
      vm.loadParticipants();
  });
