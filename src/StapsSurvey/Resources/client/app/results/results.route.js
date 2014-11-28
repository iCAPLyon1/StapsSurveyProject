(function() {
    'use strict';
    angular
        .module('app.results')
        .run(appRun);


    appRun.$inject = ['routehelper', 'quiz.json']

    function appRun(routehelper, quiz) {
        routehelper.configureRoutes(getRoutes(quiz));
    }

    function getRoutes(quiz) {
        return [
            {
                url: '/results',
                config: {
                    templateUrl: 'partials/results.html',
                    controller: 'Results',
                    controllerAs: 'vm',
                    page: quiz['subQuizzes'].length+1
                }
            }
        ];
    }
})();