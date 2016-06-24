angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams', '$cacheFactory', 'AuthService',
        function ($rootScope, $state, $stateParams, $cacheFactory, AuthService) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.cache = $cacheFactory('$rootScope');
            $rootScope.resetCache = function () {
                $rootScope.paginationInfo = {
                    totalItem: 0,
                    pageSize: 20,
                    curPage: 1,
                    maxSize: 5
                };
                $rootScope.vm = {};
            };
            $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
                var data = {};
                data.paginationInfo = $rootScope.paginationInfo;
                data.vm = $rootScope.vm;
                $rootScope.cache.put(fromState.name, data);
                $rootScope.cache.put("previousStateName", fromState.name);
                if ($rootScope.stateConvertType != "toback") {
                    $rootScope.resetCache();
                }
                $rootScope.stateConvertType = "";
            });
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                console.log("stateChangeStart");
            });
            $rootScope.back = function () {
                var previousStateName = $rootScope.cache.get("previousStateName");
                var data = $rootScope.cache.get(previousStateName);
                $rootScope.paginationInfo = data.paginationInfo;
                $rootScope.vm = data.vm;
                $rootScope.stateConvertType = "toback";
                $state.go(previousStateName);
            };
            $rootScope.hasPrimission = function (resourceId) {
                return AuthService.hasAuthResource(resourceId);
            };
            $rootScope.resetCache();
            // AuthService.initUserInfo();
        }
    ]
)