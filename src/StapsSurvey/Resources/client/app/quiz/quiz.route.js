(function() {
    'use strict';
    angular
        .module('app.quiz')
        .run(appRun);


    appRun.$inject = ['routehelper', 'quiz.json']

    function appRun(routehelper, quiz) {
        routehelper.configureRoutes(getRoutes(quiz));
    }


    function getRoutes(quiz) {
        return [
            {
                url: '/:page',
                config: {
                    template: '<ssp-quiz quiz="vm.quiz"></ssp-quiz>',
                    controller: 'Quiz',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();