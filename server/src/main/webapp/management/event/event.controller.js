(function() {
    'use strict'; // NOSONAR

    angular.module('EventController').controller('eventController', EventController);

    function EventController($log, $translate, eventAssignedService, eventUnassignedService, raceService, alertService) {
        var vm = this;
        vm.alert = alertService.getAlert();
        vm.event = { weighted: false };

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
            eventUnassignedService.createUnassignedEvent({'name': e.name, 'weighted': e.weighted}).then(function(data) {
                vm.event = { weighted: false };
                vm.addEventForm.$setPristine();
                vm.addEventForm.$setUntouched();

            }, function(errResponse) {
                $log.warn("Failed to create event", errResponse);
                alertService.setAlert($translate.instant('FAILED_ADD'));
            });
        };

        vm.deleteEvent = function(id) {
            eventUnassignedService.removeUnassigned({'id': id}).then(function(data) {}, function(error) {
              alertService.setAlert($translate.instant('FAILED_REMOVE'));
            });
        };
    };

})();