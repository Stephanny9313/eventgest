angular.module('eventgestApp')
  .controller('EventTypeController', function(EventTypeService) {
    var vm = this;

    vm.eventTypes = [];
    vm.eventType = {};
    vm.editingId = null;
    vm.message = '';
    vm.error = '';

    // ===============================
    // Cargar tipos de evento
    // ===============================
    vm.loadEventTypes = function() {
      EventTypeService.list()
        .then(function(resp) {
          vm.eventTypes = resp.data;
          vm.error = '';
        }, function(err) {
          console.error("Error cargando tipos de evento:", err);
          vm.error = 'Error cargando tipos de evento';
        });
    };

    // ===============================
    // Crear tipo de evento
    // ===============================
    vm.createEventType = function() {
      if (!vm.eventType.typeName || !vm.eventType.description) {
        vm.error = 'Nombre y Descripción son requeridos';
        return;
      }

      // Validar que no exista duplicado por nombre
      if (vm.eventTypes.some(t => t.typeName.toLowerCase() === vm.eventType.typeName.toLowerCase() && t.id !== vm.editingId)) {
        vm.error = 'Ya existe un tipo de evento con este nombre';
        return;
      }

      EventTypeService.create(vm.eventType)
        .then(function(resp) {
          vm.eventTypes.push(resp.data);
          vm.message = 'Tipo de evento creado exitosamente';
          vm.eventType = {};
          vm.error = '';
          vm.loadEventTypes();
          setTimeout(() => vm.message = '', 3000);
        }, function(err) {
          console.error("Error creando tipo de evento:", err);
          vm.error = 'Error creando tipo de evento: ' + (err.data?.message || err.statusText);
        });
    };

    // ===============================
    // Nuevo tipo de evento
    // ===============================
    vm.newEventType = function() {
      vm.eventType = {};
      vm.editingId = null;
      vm.error = '';
    };

    // ===============================
    // Editar tipo de evento
    // ===============================
    vm.editEventType = function(type) {
      vm.editingId = type.id;
      vm.eventType = angular.copy(type);
    };

    vm.updateEventType = function() {
      if (!vm.eventType.typeName || !vm.eventType.description) {
        vm.error = 'Nombre y Descripción son requeridos';
        return;
      }

      // Validar que no exista duplicado por nombre (excluyendo el actual)
      if (vm.eventTypes.some(t => t.typeName.toLowerCase() === vm.eventType.typeName.toLowerCase() && t.id !== vm.editingId)) {
        vm.error = 'Ya existe otro tipo de evento con este nombre';
        return;
      }

      EventTypeService.update(vm.editingId, vm.eventType)
        .then(function(resp) {
          var index = vm.eventTypes.findIndex(t => t.id === vm.editingId);
          if (index !== -1) {
            vm.eventTypes[index] = resp.data;
          }
          vm.message = 'Tipo de evento actualizado exitosamente';
          vm.eventType = {};
          vm.editingId = null;
          vm.error = '';
          vm.loadEventTypes();
          setTimeout(() => vm.message = '', 3000);
        }, function(err) {
          console.error("Error actualizando tipo de evento:", err);
          vm.error = 'Error actualizando tipo de evento: ' + (err.data?.message || err.statusText);
        });
    };

    // ===============================
    // Eliminar tipo de evento
    // ===============================
    vm.deleteEventType = function(id) {
      if (confirm('¿Estás seguro que deseas eliminar este tipo de evento?')) {
        EventTypeService.delete(id)
          .then(function() {
            vm.eventTypes = vm.eventTypes.filter(t => t.id !== id);
            vm.message = 'Tipo de evento eliminado exitosamente';
            vm.error = '';
            vm.loadEventTypes();
            setTimeout(() => vm.message = '', 3000);
          }, function(err) {
            console.error("Error eliminando tipo de evento:", err);
            vm.error = 'Error eliminando tipo de evento: ' + (err.data?.message || err.statusText);
          });
      }
    };

    // ===============================
    // Cancelar edición
    // ===============================
    vm.cancel = function() {
      vm.eventType = {};
      vm.editingId = null;
      vm.error = '';
    };

    // Cargar al inicio
    vm.loadEventTypes();
  });
