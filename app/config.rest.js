angular.module('app')
    .factory('AuthRestangular', ['Restangular', 'modal', function (Restangular, modal) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://127.0.0.1:8080/gpsserver/');
            RestangularConfigurer.setErrorInterceptor(function (response, deferred, responseHandler) {
                modal.error("系统错误，请重试");

            });
        });
    }])
    .factory('CarCreditRestangular', ['Restangular', '$state', 'modal', '$rootScope', '$injector', function (Restangular, $state, modal, $rootScope, $injector) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://127.0.0.1:8080/gpsserver/api');
            RestangularConfigurer.setFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
                if (operation == 'getList') {
                    params.pageSize = params.pageSize || $rootScope.paginationInfo.pageSize;
                    params.curPage = params.curPage || $rootScope.paginationInfo.curPage;
                };
                angular.extend($rootScope.vm, params);
                return {
                    headers: {
                        'Authorization': window.localStorage.Authorization
                    },
                    params: $rootScope.vm
                };
            });
            RestangularConfigurer.setErrorInterceptor(function (response, deferred, responseHandler) {
                var AuthService = $injector.get('AuthService');
                if (response.status == 401) {
                    if (AuthService.isAuth()) {
                        AuthService.reLogin();
                    } else {
                        modal.error("未授权操作，请重新登陆");
                        $state.go('access.signin');
                    }

                } else {
                    modal.error("系统错误，请重试");
                }
                ;
            });
            RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                if (data.successResponse == false) {
                    modal.error(data.message);
                    return deferred.reject();
                } else {
                    if (operation == 'getList') {
                        if (angular.isArray(data)) {
                            return data;
                        } else {
                            //如果为getList操作返回的不是Array对象则为翻页数据需特殊处理
                            $rootScope.paginationInfo.totalItem = data.totalItem;
                            return data.data;
                        }
                    } else {
                        return data;
                    }
                }
            });
        });
    }])
    .factory('QuestionRestangular',function(CarCreditRestangular){
        return CarCreditRestangular.withConfig(function(RestangularConfigurer){
            RestangularConfigurer.setBaseUrl('http://127.0.0.1:8080/gpsserver/');
        })
    })

