angular.module('eventgestApp')
        .controller('ProgramController', function(ProgramService) {
            var vm = this;

            vm.programs = [];
            vm.program = {};
            vm.editingId = null;
            vm.message = '';
            vm.error = '';

            // ===============================
            // Cargar programas desde backend
            // ===============================
            vm.loadPrograms = function() {
                ProgramService.list()
                    .then(function(resp) {
                        // Convertir fechas de string a Date para que AngularJS las maneje correctamente
                        vm.programs = resp.data.map(function(program) {
                            if (program.starYear && typeof program.starYear === 'string') {
                                program.starYear = new Date(program.starYear);
                            }
                            if (program.endYear && typeof program.endYear === 'string') {
                                program.endYear = new Date(program.endYear);
                            }
                            return program;
                        });
                        vm.error = '';
                    }, function(err) {
                        console.error("Error cargando programas:", err);
                        vm.error = 'Error cargando programas';
                    });
            };

            // ===============================
            // Formatear fechas para el backend
            // ===============================
            vm.formatProgramForBackend = function(program) {
                var copy = angular.copy(program);
                
                // Convertir fechas Date a formato ISO string (YYYY-MM-DD)
                if (copy.starYear instanceof Date) {
                    copy.starYear = copy.starYear.toISOString().split('T')[0];
                }
                if (copy.endYear instanceof Date) {
                    copy.endYear = copy.endYear.toISOString().split('T')[0];
                }
                
                return copy;
            };

            // ===============================
            // Generar código automático
            // ===============================
            vm.generateCode = function() {
                if (vm.programs.length === 0) {
                    vm.program.code = 'PROG001';
                } else {
                   // Obtener el último código y  incrementar
                    var codes = vm.programs.map(p => p.code).sort();
                    var lastCode = codes[codes.length - 1];
                    var number = parseInt(lastCode.replace('PROG', '')) + 1;
                    vm.program.code = 'PROG' + String(number).padStart(3, '0');
                }
            };

            // ===============================
            // Validar si existe duplicado por código
            // ===============================
            vm.existsCodeDuplicate = function(code) {
                return vm.programs.some(p => p.code === code && p.id !== vm.editingId);
            };

            // ===============================
            // Validar si existe duplicado por nombre
            // ===============================
            vm.existsNameDuplicate = function(name) {
                return vm.programs.some(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== vm.editingId);
            };

            // ===============================
            // Crear programa
            // ===============================
            vm.createProgram = function() {
                if (!vm.program.name || !vm.program.starYear || !vm.program.endYear) {
                    vm.error = 'Nombre, Año Inicio y Año Fin son requeridos';
                    return;
                }

                // Validar duplicado por NOMBRE
                if (vm.existsNameDuplicate(vm.program.name)) {
                    vm.error = 'Ya existe un programa con el nombre: ' + vm.program.name;
                    return;
                }

                // Validar que la fecha de fin sea posterior a la de inicio
                var startDate = new Date(vm.program.starYear);
                var endDate = new Date(vm.program.endYear);
                if (endDate <= startDate) {
                    vm.error = 'El Año Fin debe ser mayor al Año Inicio';
                    return;
                }

                // Si no hay código, generar uno
                if (!vm.program.code) {
                    vm.generateCode();
                }

                // Validar duplicado por CÓDIGO
                if (vm.existsCodeDuplicate(vm.program.code)) {
                    vm.error = 'Ya existe un programa con el código: ' + vm.program.code;
                    return;
                }

                // Formatear fechas para el backend
                var programToSend = vm.formatProgramForBackend(vm.program);

                ProgramService.create(programToSend)
                    .then(function(resp) {
                        vm.programs.push(resp.data);
                        vm.message = 'Programa creado exitosamente';
                        vm.program = {};
                        vm.error = '';
                        vm.loadPrograms();
                        setTimeout(() => vm.message = '', 3000);
                    }, function(err) {
                        console.error("Error creando programa:", err);
                        vm.error = 'Error creando programa: ' + (err.data?.message || err.statusText);
                    });
            };

            // ===============================
            // Nuevo programa (generar código)
            // ===============================
            vm.newProgram = function() {
                vm.program = {};
                vm.editingId = null;
                vm.generateCode();
            };

            // ===============================
            // Actualizar programa
            // ===============================
            vm.editProgram = function(program) {
                vm.editingId = program.id;
                vm.program = angular.copy(program);
            };

            vm.updateProgram = function() {
                if (!vm.program.name || !vm.program.starYear || !vm.program.endYear) {
                    vm.error = 'Nombre, Año Inicio y Año Fin son requeridos';
                    return;
                }

                // Validar duplicado por NOMBRE solo si se cambió el nombre y ya existe otro programa con ese nombre
                var currentProgram = vm.programs.find(p => p.id === vm.editingId);
                if (currentProgram && currentProgram.name !== vm.program.name && vm.existsNameDuplicate(vm.program.name)) {
                    vm.error = 'Ya existe otro programa con el nombre: ' + vm.program.name;
                    return;
                }

                // Validar que la fecha de fin sea posterior a la de inicio
                var startDate = new Date(vm.program.starYear);
                var endDate = new Date(vm.program.endYear);
                if (endDate <= startDate) {
                    vm.error = 'El Año Fin debe ser mayor al Año Inicio';
                    return;
                }

                // Formatear fechas para el backend
                var programToSend = vm.formatProgramForBackend(vm.program);

                ProgramService.update(vm.editingId, programToSend)
                    .then(function(resp) {
                        var index = vm.programs.findIndex(p => p.id === vm.editingId);
                        if (index !== -1) {
                            vm.programs[index] = resp.data;
                        }
                        vm.message = 'Programa actualizado exitosamente';
                        vm.program = {};
                        vm.editingId = null;
                        vm.error = '';
                        vm.loadPrograms();
                        setTimeout(() => vm.message = '', 3000);
                    }, function(err) {
                        console.error("Error actualizando programa:", err);
                        vm.error = 'Error actualizando programa: ' + (err.data?.message || err.statusText);
                    });
            };

            // ===============================
            // Eliminar programa
            // ===============================
            vm.deleteProgram = function(id) {
                if (confirm('¿Estás seguro que deseas eliminar este programa?')) {
                    vm.error = '';
                    ProgramService.delete(id)
                        .then(function() {
                            vm.programs = vm.programs.filter(p => p.id !== id);
                            vm.message = 'Programa eliminado exitosamente';
                            vm.error = '';
                            vm.loadPrograms();
                            setTimeout(() => vm.message = '', 3000);
                        }, function(err) {
                            console.error("Error eliminando programa:", err);
                            var errorMsg = err.data?.message || err.statusText || 'Error desconocido';
                            vm.error = 'Error eliminando programa: ' + errorMsg;
                        });
                }
            };

            // ===============================
            // Cancelar edición
            // ===============================
            vm.cancel = function() {
                vm.program = {};
                vm.editingId = null;
                vm.error = '';
            };

            // Cargar al inicio
            vm.loadPrograms();
        });