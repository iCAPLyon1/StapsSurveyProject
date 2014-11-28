(function() {
    'use strict';
    var core = angular.module('app.core');

    core.config(configure);

    configure.$inject=['$logProvider', '$routeProvider', 'routehelperConfigProvider'];
    function configure ($logProvider, $routeProvider, routehelperConfigProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
        var resolveAlways = {
            ready: resolveAlwaysReady
        };

        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        //////////////////////////////////////
        resolveAlwaysReady.$inject = ['dataservice'];

        function resolveAlwaysReady (dataservice) {
            return dataservice.ready();
        }
    }
})();