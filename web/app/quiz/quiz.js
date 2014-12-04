(function() {
    'use strict';
    angular.module('app.quiz', [
        'blocks.router',
        'underscore',
        'ngAnimate',
        'ngSanitize'
    ]);
})();
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
            },
            {
                url: '/',
                config: {
                    template: '<ssp-quiz quiz="vm.quiz"></ssp-quiz>',
                    controller: 'Quiz',
                    controllerAs: 'vm',
                    page: 1
                }
            }
        ];
    }
})();
(function() {
    'use strict';
    angular
        .module('app.quiz')
        .controller('Quiz', Quiz);

    Quiz.$inject = ['dataservice', '$routeParams'];

    function Quiz(dataservice, $routeParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.quiz = {};
        vm.title = '';
        vm.page = $routeParams['page']?parseInt($routeParams['page']):1;
        vm.pages = vm.page;

        activate();
        function activate() {
            // Using a resolver on all routes or dataservice.ready in every controller
            // var promises = [getQuiz()];
            // return dataservice.ready(promises).then(function(){
            return getQuiz().then(function() {});
        }

        function getQuiz() {
            return dataservice.getSubQuiz(vm.page).then(function(data) {
                vm.quiz = data;
                vm.title = data.title;
                vm.pages = data.pages;

                return vm.quiz;
            });
        }
    }
})();
(function(){
    'use strict';

    angular.module('app.quiz')
        .directive('sspQuiz', sspQuiz);

    function sspQuiz () {
        var directive = {
            restrict: 'E',
            controller: sspQuizController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                quiz: '=',
                options: '='
            },
            templateUrl: 'partials/quiz.html',
            replace: true
        };

        return directive;

        function sspQuizController() {
            var vm = this;

        }
    }
})();
(function(){
    'use strict';

    angular.module('app.quiz')
        .directive('sspQuestion', sspQuestion);

    function sspQuestion () {
        var directive = {
            restrict: 'E',
            controller: sspQuestionController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                question: '=',
                options: '='
            },
            templateUrl: 'partials/question.html',
            replace: true
        };

        sspQuestionController.$inject = ['_'];

        return directive;

        function sspQuestionController(_) {
            var vm = this;
            vm.hasFilter = !_.isUndefined(vm.question.filter)&&!_.isNull(vm.question.filter);
            if (vm.hasFilter) {
                vm.question.userFilter = _.isUndefined(vm.question.userFilter)?vm.question.filter.options[0]:vm.question.userFilter;
            } else {
                vm.question.userFilter = null;
            }
        }
    }
})();
(function(){
    'use strict';

    angular.module('app.quiz')
        .directive('sspSubQuestion', sspSubQuestion);

    function sspSubQuestion () {
        var directive = {
            restrict: 'E',
            controller: sspSubQuestionController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                subquestion: '=',
                options: '='
            },
            templateUrl: 'partials/subquestion.html',
            replace: true
        };

        sspSubQuestionController.$inject = ['_', 'quiz.json'];

        return directive;

        function sspSubQuestionController(_, quiz) {
            var vm = this;
            if(_.isUndefined(vm.subquestion.userAnswer))vm.subquestion.userAnswer = null;
            vm.choiceChanged = choiceChanged;
            vm.choiceValue = (_.isNull(vm.subquestion.userAnswer))?null:vm.subquestion.userAnswer.toString();
            vm.colNum = Math.floor(12/vm.subquestion.answers.length);

            function choiceChanged (newValue) {
                vm.choiceValue = newValue;
                vm.subquestion.userAnswer = parseInt(newValue);
            }
        }
    }
})();
(function() {
    'use strict';
    angular.module('app.quiz')
        .filter('isInOption', isInOption);

    isInOption.$inject = ['_']
    function isInOption (_) {
        return applyFilter;

        function applyFilter (items, filter) {
            var filteredItems = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (_.isNull(filter) || _.isUndefined(item['@filter'])) {
                    item.isActive = true;
                    filteredItems.push(item);
                } else {
                    var itemFilterArray = item['@filter'].split(',');
                    item.isActive = false;
                    if (_.indexOf(itemFilterArray, filter.value)>-1) {
                        item.isActive = true;
                        filteredItems.push(item);
                    }
                }
            }

            return filteredItems;
        }
    }
})();
(function () {
    'use strict';
    angular.module('app.quiz')
        .run(quizTemplate);

    quizTemplate.$inject = ['$templateCache'];

    function quizTemplate ($templateCache) {
        var tplHtml = ''+
            '<div class="ssp-quiz">'+
                '<h3 class="sub-quiz-title" data-ng-bind-html="::vm.quiz.title"></h3>'+
                '<ssp-question question="question" data-ng-repeat="question in vm.quiz.questions" options="vm.options"></ssp-question>'+
                '<div class="ssp-quiz-pagination">'+
                    '<a class="btn btn-default" href="#/{{vm.quiz.page-1}}" data-ng-class="{\'disabled\':vm.quiz.page<=1}"><i class="fa fa-angle-left"></i> Précédent</a>'+
                    '<a class="btn btn-primary pull-right" href="#/results" data-ng-if="vm.quiz.page>=vm.quiz.pages">Terminer</a>'+
                    '<a class="btn btn-default pull-right" href="#/{{vm.quiz.page+1}}" data-ng-class="{disabled:vm.quiz.page>=vm.quiz.pages}">Suivant <i class="fa fa-angle-right"></i></a>'+
                '</div>'+
            '</div>';

        $templateCache.put(
            'partials/quiz.html',
            tplHtml
        );
    }
})();


(function () {
    'use strict';
    angular.module('app.quiz')
        .run(questionTemplate);

    questionTemplate.$inject = ['$templateCache'];

    function questionTemplate ($templateCache) {
        var tplHtml = ''+
            '<div class="ssp-question panel panel-default">'+
                '<div class="panel-heading"><h3 class="ssp-question-title panel-title" data-ng-bind-html="::vm.question.title"></h3></div>'+
                '<div class="ssp-question-body panel-body">'+
                    '<div data-ng-if="vm.hasFilter">'+
                        '<span data-ng-bind-html="::vm.question.filter.title"></span> '+
                        '<select data-ng-if="vm.hasFilter" data-ng-model="vm.question.userFilter" data-ng-options="option.title for option in vm.question.filter.options">'+
                        '</select>'+
                    '</div>'+
                    '<div class="ssp-question-section" data-ng-repeat="section in vm.question.sections | isInOption:vm.question.userFilter">'+
                        '<h4 class="ssp-question-section-title" data-ng-bind-html="::section.title"></h4>'+
                        '<div class="ssp-question-section-subquestions">'+
                            '<div class="ssp-question-section-subquestion" data-ng-repeat="subquestion in section.subQuestions | isInOption:vm.question.userFilter">'+
                                '<ssp-sub-question subquestion="subquestion" options="vm.options"></ssp-sub-question>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
        '</div>';

        $templateCache.put(
            'partials/question.html',
            tplHtml
        );
    }
})();
(function () {
    'use strict';
    angular.module('app.quiz')
        .run(subquestionTemplate);

    subquestionTemplate.$inject = ['$templateCache'];

    function subquestionTemplate ($templateCache) {
        var tplHtml = ''+
                '<div class="row">'+
                    '<div class="ssp-sub-question-title col-md-6" data-ng-bind-html="::vm.subquestion.title"></div>'+
                    '<div class="ssp-sub-question-answers col-md-6">'+
                        '<div class="ssp-sub-question-answer col-xs-{{::vm.colNum}}" data-ng-class="{\'choice-selected\':vm.choiceValue==answer.value}" data-ng-repeat="answer in vm.subquestion.answers" data-ng-click="vm.choiceChanged(answer.value)">'+
                            '<span data-ng-bind-html="::answer.title"></span>'+
                        '</div>'+
                    '</div>' +
                '</div>';

        $templateCache.put(
            'partials/subquestion.html',
            tplHtml
        );
    }
})();