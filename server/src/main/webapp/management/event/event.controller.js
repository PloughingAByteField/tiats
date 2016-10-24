(function() {
    'use strict'; // NOSONAR

    angular.module('EventController').controller('eventController', EventController);

    function EventController($log, Event, $translate, eventAssignedService, eventUnassignedService, raceService, alertService) {
        var vm = this;
        vm.alert = alertService.getAlert();

        eventAssignedService.getAssignedEvents().then(function(data) {
            vm.assigned = data;
            raceDataChange();
        });

        eventUnassignedService.getUnassigned().then(function(data) {
            vm.unassigned = data;
        });

        raceService.getRaces().then(function(data) {
            vm.races = data;
            raceService.setCurrentRace(vm.races[0].id);
            vm.currentRace = raceService.getCurrentRace();
            raceDataChange();
        });

        function raceDataChange() {
            if (vm.assigned && vm.currentRace) {
                vm.raceChanged(vm.currentRace);
            }
        };

        vm.closeAlert = function() {
            alertService.clearAlert();
        };

        vm.raceChanged = function(raceId) {
            vm.assignedToRace = eventAssignedService.getAssignedEventsForRace(raceId);
            raceService.setCurrentRace(raceId);
        };

        vm.createEvent = function(e) {
            var event = new Event();
            event.name = e.name;
            event.weighted = e.weighted;
            $log.debug(event);
            eventUnassignedService.createUnassignedEvent(event).then(function(data) {
                vm.event = {};
                vm.addEventForm.$setPristine();
                vm.addEventForm.$setUntouched();

            }, function(errResponse) {
                $log.warn("Failed to create event", errResponse);
                alert = {
                    type: 'danger',
                    msg: $translate.instant('FAILED_ADD')
                };
                alertService.setAlert(alert);
            });
        };

        vm.deleteEvent = function(id) {
            eventUnassignedService.removeUnassigned(id).then(function(data) {
            }, function(error) {
              alert = {
                type: 'danger',
                msg: $translate.instant('FAILED_REMOVE')
              };
              alertService.setAlert(alert);
            });
        };
    };

})();