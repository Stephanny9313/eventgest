angular.module('eventgestApp')
.controller('DashboardController', function(DashboardService) {
    var vm = this;

    vm.events = [];
    vm.eventTypes = [];
    vm.programs = [];
    vm.audits = [];

    // Cargar todos los datos
    vm.loadData = function() {
        DashboardService.getEvents().then(function(resp) {
            vm.events = resp.data;
            vm.renderChart();
        }, function(err) {
            console.error('Error cargando eventos:', err);
        });

        DashboardService.getEventTypes().then(function(resp) {
            vm.eventTypes = resp.data;
        }, function(err) {
            console.error('Error cargando tipos de eventos:', err);
        });

        DashboardService.getPrograms().then(function(resp) {
            vm.programs = resp.data;
        }, function(err) {
            console.error('Error cargando programas:', err);
        });

        DashboardService.getAudits().then(function(resp) {
            vm.audits = resp.data;
        }, function(err) {
            console.error('Error cargando auditorías:', err);
        });
    };

    // Actualizar evento
    vm.updateEvent = function(event) {
        DashboardService.updateEvent(event).then(function(resp) {
            console.log('Evento actualizado:', resp.data);
        }, function(err) {
            console.error('Error actualizando evento:', err);
        });
    };

    // Eliminar evento
    vm.deleteEvent = function(id) {
        if (confirm('¿Seguro que deseas eliminar este evento?')) {
            DashboardService.deleteEvent(id).then(function() {
                vm.events = vm.events.filter(function(e) { return e.id !== id; });
            }, function(err) {
                console.error('Error eliminando evento:', err);
            });
        }
    };

    // Renderizar gráfico
    vm.renderChart = function() {
        setTimeout(function() {
            var chartCanvas = document.getElementById('eventsChart');
            if (chartCanvas) {
                var ctx = chartCanvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: vm.events.map(function(e) { return e.name; }),
                        datasets: [{
                            label: 'Participantes',
                            data: vm.events.map(function(e) { return e.participantsCount || 0; }),
                            backgroundColor: '#3e95cd'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: true }
                        }
                    }
                });
            }
        }, 300);
    };

    // Inicializar
    vm.loadData();
});
