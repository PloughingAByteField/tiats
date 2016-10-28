(function() {
    'use strict'; // NOSONAR

    angular.module('AlertService', []).service('alertService', AlertService);

    function AlertService() {
        var alert = { msg : null, type: null };

        var service = {
            clearAlert: clearAlert,
            getAlert: getAlert,
            setAlert: setAlert
        };

        return service;

        function clearAlert() {
            alert.msg = null;
            alert.type = null;
        };

        function getAlert() {
            return alert;
        };

        function setAlert(msg) {
            alert.msg = msg;
            alert.type = 'danger';
        };
    };
})();