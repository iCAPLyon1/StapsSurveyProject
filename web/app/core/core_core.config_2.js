(function() {
    'use strict';
    var core = angular.module('app.core');

    core.config(configure);

    configure.$inject=['$logProvider', '$routeProvider', 'routehelperConfigProvider', 'quiz.json'];
    function configure ($logProvider, $routeProvider, routehelperConfigProvider, quiz) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = quiz.title;
        var resolveAlways = {
            ready: resolveAlwaysReady
        };

        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        //////////////////////////////////////
        resolveAlwaysReady.$inject = ['dataservice', '$timeout'];

        function resolveAlwaysReady (dataservice, $timeout) {
            //return $timeout(dataservice.ready, 0, false);

            return dataservice.ready();
        }
    }
})();