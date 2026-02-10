angular.module('eventgestApp')
  .controller('RegistrationController', function(RegistrationService, EventService, ParticipantService) {
      var vm = this;

      // ====================================
      // VARIABLES
      // ====================================
      vm.showTab = 'registrar'; // Tab por defecto
      vm.newParticipant = {};
      vm.registration = {};
      vm.registrations = [];
      vm.events = [];
      vm.participants = [];
      vm.notification = null;

      vm.loadRegistrations = function() {
          RegistrationService.list().then(function(resp) {
              vm.registrations = resp.data.content || resp.data;
          }).catch(function(err) {
              console.error('Error cargando registros:', err);
          });
      };

      vm.loadEvents = function() {
          EventService.list().then(function(resp) {
              vm.events = resp.data.content || resp.data;
          }).catch(function(err) {
              console.error('Error cargando eventos:', err);
          });
      };

      vm.loadParticipants = function() {
          ParticipantService.list().then(function(resp) {
              vm.participants = resp.data.content || resp.data;
              console.log('Participantes cargados:', vm.participants.length);
          }).catch(function(err) {
              console.error('Error cargando participantes:', err);
              vm.notification = { 
                  type: 'error', 
                  message: '❌ Error al cargar participantes: ' + (err.status || 'Error desconocido') 
              };
          });
      };

      // ====================================
      // SELECCIONAR PARTICIPANTE PARA REGISTRAR
      // ====================================
      vm.selectParticipantToRegister = function(participant) {
          vm.registration.participantId = participant.id;
          vm.showTab = 'registrar';
          vm.notification = { 
              type: 'success', 
              message: '✅ Participante ' + participant.name + ' seleccionado. Ahora elige un evento.' 
          };
          setTimeout(function() {
              vm.notification = null;
          }, 2000);
      };

      // ====================================
      // REGISTRAR PARTICIPANTE A EVENTO
      // ====================================
      vm.registerParticipant = function() {
          if(!vm.registration.eventId || !vm.registration.participantId) {
              vm.notification = { 
                  type: 'error', 
                  message: '⚠️ Debes seleccionar evento y participante' 
              };
              return;
          }

          RegistrationService.register(vm.registration).then(function(resp) {
              vm.registrations.push(resp.data);
              vm.registration = {};
              
              vm.notification = { 
                  type: 'success', 
                  message: '✅ ¡Participante registrado exitosamente al evento!' 
              };
              
              setTimeout(function() {
                  vm.notification = null;
              }, 3000);
              
              vm.loadRegistrations();
          }).catch(function(err) {
              vm.notification = { 
                  type: 'error', 
                  message: '❌ Error al registrar: ' + (err.data?.message || err.statusText || 'Error desconocido') 
              };
          });
      };

      // ====================================
      // CREAR NUEVO PARTICIPANTE
      // ====================================
      vm.createParticipant = function() {
          if(!vm.newParticipant.name || !vm.newParticipant.email) {
              vm.notification = { 
                  type: 'error', 
                  message: '⚠️ Nombre y Email son obligatorios' 
              };
              return;
          }

          ParticipantService.create(vm.newParticipant).then(function(resp) {
              vm.participants.push(resp.data);
              
              vm.notification = { 
                  type: 'success', 
                  message: '✅ Participante ' + resp.data.name + ' creado exitosamente' 
              };
              
              vm.newParticipant = {};
              
              setTimeout(function() {
                  vm.showTab = 'registrar';
                  vm.notification = null;
              }, 2000);
              
          }).catch(function(err) {
              console.error('Error al crear:', err);
              vm.notification = { 
                  type: 'error', 
                  message: '❌ Error: ' + (err.data?.message || err.statusText || 'Error desconocido') 
              };
          });
      };

      // ====================================
      // ELIMINAR REGISTRO
      // ====================================
      vm.deleteRegistration = function(id) {
          if(!confirm('¿Estás seguro de eliminar esta inscripción?')) return;
          
          RegistrationService.delete(id).then(function() {
              vm.registrations = vm.registrations.filter(r => r.id !== id);
              vm.notification = { 
                  type: 'success', 
                  message: '✅ Inscripción eliminada' 
              };
              setTimeout(function() {
                  vm.notification = null;
              }, 2000);
          }).catch(function(err) {
              vm.notification = { 
                  type: 'error', 
                  message: '❌ Error al eliminar: ' + (err.data?.message || 'Error desconocido') 
              };
          });
      };

      // ====================================
      // INICIALIZACIÓN
      // ====================================
      vm.loadParticipants();
      vm.loadEvents();
      vm.loadRegistrations();
  });

