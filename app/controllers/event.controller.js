angular.module('eventgestApp')
.controller('EventController', function(EventService, EventTypeService, ProgramService, ParticipantService) {
    var vm = this;

    vm.events = [];
    vm.eventTypes = [];
    vm.programs = [];
    vm.participants = [];
    vm.event = {};
    vm.newEventType = {};
    vm.newProgram = {};
    vm.newParticipant = {};
    vm.message = '';
    vm.error = '';

    // ===========================
    // CARGAR DATOS INICIALES
    // ===========================
    vm.loadEvents = function() {
        EventService.list()
            .then(resp => {
                vm.events = resp.data.content || resp.data;
                vm.error = '';
            })
            .catch(err => {
                console.error("Error cargando eventos:", err);
                vm.error = 'Error cargando eventos';
            });
    };

    vm.loadEventTypes = function() { 
        EventTypeService.list()
            .then(resp => {
                vm.eventTypes = resp.data;
                vm.error = '';
            })
            .catch(err => {
                console.error("Error cargando tipos de eventos:", err);
                vm.error = 'Error cargando tipos de eventos';
            });
    };

    vm.loadPrograms = function() { 
        ProgramService.list()
            .then(resp => {
                vm.programs = resp.data;
                console.log("Programas cargados:", vm.programs);
                vm.error = '';
            })
            .catch(err => {
                console.error("Error cargando programas:", err);
                vm.error = 'Error cargando programas';
            });
    };

    vm.loadParticipants = function() { 
        ParticipantService.list()
            .then(resp => {
                vm.participants = resp.data;
                vm.error = '';
            })
            .catch(err => {
                console.error("Error cargando participantes:", err);
                vm.error = 'Error cargando participantes';
            });
    };

    // ===========================
    // CREAR ELEMENTOS
    // ===========================
    vm.createEventType = function() {
        EventTypeService.create(vm.newEventType)
            .then(resp => {
                vm.eventTypes.push(resp.data);
                vm.message = 'Tipo de evento creado';
                vm.newEventType = {};
                setTimeout(() => vm.message = '', 3000);
            })
            .catch(err => {
                vm.error = 'Error creando tipo de evento: ' + (err.data?.message || err.statusText);
            });
    };

    vm.createProgram = function() {
        ProgramService.create(vm.newProgram)
            .then(resp => {
                vm.programs.push(resp.data);
                vm.message = 'Programa creado';
                vm.newProgram = {};
                vm.loadPrograms();
                setTimeout(() => vm.message = '', 3000);
            })
            .catch(err => {
                vm.error = 'Error creando programa: ' + (err.data?.message || err.statusText);
            });
    };

    vm.createParticipant = function() {
        ParticipantService.create(vm.newParticipant)
            .then(resp => {
                vm.participants.push(resp.data);
                vm.message = 'Participante creado';
                vm.newParticipant = {};
                setTimeout(() => vm.message = '', 3000);
            })
            .catch(err => {
                vm.error = 'Error creando participante: ' + (err.data?.message || err.statusText);
            });
    };

    vm.createEvent = function() {
        if (!vm.event.title || !vm.event.startAt || !vm.event.endAt) {
            vm.error = 'Título, Inicio y Fin son requeridos';
            return;
        }

        EventService.create(vm.event)
            .then(resp => {
                vm.events.push(resp.data);
                vm.message = 'Evento creado exitosamente';
                vm.event = {};
                vm.error = '';
                vm.loadEvents();
                setTimeout(() => vm.message = '', 3000);
            })
            .catch(err => {
                vm.error = 'Error creando evento: ' + (err.data?.message || err.statusText);
            });
    };

    // ===========================
    // ACTUALIZAR ELEMENTOS
    // ===========================
    vm.updateEvent = function(event) { EventService.update(event); };
    vm.updateEventType = function(type) { EventTypeService.update(type.id, type); };
    vm.updateProgram = function(program) { ProgramService.update(program.id, program); };
    vm.updateParticipant = function(participant) { ParticipantService.update(participant.id, participant); };

    // ===========================
    // ELIMINAR ELEMENTOS
    // ===========================
    vm.deleteEvent = function(id) { 
        if (confirm('¿Eliminar este evento?')) {
            EventService.delete(id).then(() => vm.loadEvents()); 
        }
    };
    vm.deleteEventType = function(id) { 
        if (confirm('¿Eliminar este tipo de evento?')) {
            EventTypeService.delete(id).then(() => vm.loadEventTypes()); 
        }
    };
    vm.deleteProgram = function(id) { 
        if (confirm('¿Eliminar este programa?')) {
            ProgramService.delete(id).then(() => vm.loadPrograms()); 
        }
    };
    vm.deleteParticipant = function(id) { 
        if (confirm('¿Eliminar este participante?')) {
            ParticipantService.delete(id).then(() => vm.loadParticipants()); 
        }
    };

    // ===========================
    // INICIALIZAR
    // ===========================
    vm.loadEvents();
    vm.loadEventTypes();
    vm.loadPrograms();
    vm.loadParticipants();
});
