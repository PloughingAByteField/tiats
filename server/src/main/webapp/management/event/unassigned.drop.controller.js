(function() {
    'use strict'; // NOSONAR

    angular.module('EventController').controller('eventDropOnUnassignedController', EventUnassignedDropController);

    function EventUnassignedDropController($log, eventUnassignedService, eventAssignedService, raceService) {
        var vm = this;
        eventUnassignedService.getUnassigned().then(function(data) {
            vm.unassigned = data;
        });

        vm.dropOnUnassigned = function(dropEvent, index, item) {
            if (typeof item.raceEventOrder !== 'undefined') {
                $log.debug('Have unassignment of ' + item.event.name + ' from ' + item.raceEventOrder);
                eventUnassignedService.unassignEvent(item.event, index);
                eventAssignedService.unassignEvent(item, raceService.getCurrentRace());

            } else {
                return false;
            }

            return true;
        };

    };
})();