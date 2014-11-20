(function() {
    'use strict';
    angular
        .module('app.quiz')
        .run(appRun);


    appRun.$inject = ['routehelper']

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }


    function getRoutes(quiz) {
        return [
            {
                url: '/quiz/:page',
                config: {
                    templateUrl: 'app/quiz/partials/quiz.html',
                    controller: 'Quiz',
                    controllerAs: 'vm',
                    title: quiz.title
                }
            },
            {
                url: '/quiz',
                config: {
                    templateUrl: 'app/quiz/partials/quiz.html',
                    controller: 'Quiz',
                    controllerAs: 'vm',
                    page: 1,
                    title: quiz.title
                }
            }
        ];
    }
})();