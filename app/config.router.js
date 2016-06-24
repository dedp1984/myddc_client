angular.module("app")
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/access/signin');
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'app.html'
                })
                .state('app.index', {
                    url: '/index',
                    templateUrl: 'blank.html'
                })
        }
    ]
);
