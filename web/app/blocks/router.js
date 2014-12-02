(function() {
    'use strict';
    angular.module('blocks.router', [
        'ngRoute',
        'underscore'
    ]);
})();
(function() {
    'use strict';

    angular.module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$route', 'routehelperConfig', '_'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
        // These are the properties we need to set
        // $routeProvider: undefined
        // docTitle: ''
        // resolveAlways: {ready: function(){ } }
        };
        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, routehelperConfig, _) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routesVisited = [];
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };
        init();

        return service;

        ///////////////
        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/1'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    console.log(msg);
                    $location.path('/1');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updatePageTitle();
            updateNavigationAnimation();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function updatePageTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;

                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    if (routesVisited.indexOf(current.page) == -1)  {
                        routesVisited.push(current.page);
                    }

                    $rootScope.title = title; // data bind to <title>
                    $rootScope.page = current.page;
                }
            );
        }

        function updateNavigationAnimation() {
            //Test route change start
            $rootScope.$on('$routeChangeStart',
                function(event, next, current) {
                    //Update page number for progress bar
                    if (!_.isUndefined(next.params.page)) {
                        var pageNo = parseInt(next.params.page);
                        if(isNaN(pageNo)) $location.path('/1');
                    }
                    if (next.params.page) {
                        next.page = Math.max(1, parseInt(next.params.page));
                    } else if (next.page) {
                        next.params.page = next.page;
                    } else {
                        next.params.page = next.page = 1;
                    }

                    var currentPage = current?current.page:0;
                    var nextPage = next.page;
                    if (nextPage>1 && routesVisited.indexOf(nextPage-1)==-1) {
                        var routesVisitedCount = routesVisited.length;
                        $location.path('/'+((routesVisitedCount>0)?routesVisited[routesVisitedCount-1]:1));
                    }
                    $rootScope.isDownwards = nextPage<=currentPage;
                }
            );
        }
    }
})();