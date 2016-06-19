angular.module('pu.access.services')
    .service('AuthService', ['$rootScope', 'AuthRestangular', '$state', '$q', 'CarCreditRestangular', '$uibModal', 'toaster', function ($rootScope, AuthRestangular, $state, $q, CarCreditRestangular, $uibModal, toaster) {
        var isAuth = false;
        var authResource = {};
        this.login = function (id, passwd) {
            var user = {};
            user.id = id;
            user.passwd = passwd;
            var defered = $q.defer();
            AuthRestangular.all('auth').post(user).then(function (response) {
                if (response.successResponse) {
                    window.localStorage.Authorization = response.data.Authorization;
                    window.localStorage.account = angular.toJson(response.data.account);
                    $rootScope.account = response.data.account;
                    CarCreditRestangular.all('accounts').all("authmenu").all(user.id).getList().then(function (response) {
                        angular.forEach(response, function (item) {
                            authResource[item.routepath] = 'all';
                        })
                        isAuth = true;
                        defered.resolve();
                    });
                }
                else {
                    defered.reject(response.message);
                }
            })
            return defered.promise;
        };
        this.hasAuthResource = function (resourceId) {
            return authResource[resourceId] == 'all';
        };
        this.isAuth = function () {
            return isAuth;
        };
        this.modifyPasswd = function (oldPasswd, newPasswd) {
            var user = {};
            user.accountId = angular.fromJson(window.localStorage.account).id;
            user.oldPasswd = oldPasswd;
            user.newPasswd = newPasswd;
            var defered = $q.defer();
            CarCreditRestangular.all('accounts').all('modifyPasswd').post(user).then(function (response) {
                defered.resolve();
            }, function (response) {
                defered.reject(response.message);
            })
            return defered.promise;
        };
        this.reLogin = function () {
            var $uibModalInstance = $uibModal.open({
                animation: true,
                backdrop: true,
                templateUrl: 'app/login/tpl/dialog-relogin.html',
                controller: function ($scope, AuthService) {
                    $scope.reLogin = function () {
                        AuthService.login($scope.user.accountid, $scope.user.passwd).then(function (response) {
                            $uibModalInstance.close();
                            toaster.pop('success', '操作提醒', '重新登陆成功');
                        }, function (response) {
                            $scope.errmsg = response;
                        })
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            });
        };
        this.isWeakPasswd = function (val) {
            var regx = /^[0-9]+$|^[a-z]+$|^[A-Z]+$/;
            return regx.test(val) || val.length < 8;
        };
        this.signup = function () {
            isAuth = false;
            authResource = {};
            window.localStorage.removeItem("Authorization");
            window.localStorage.removeItem("account");
        };
        this.initUserInfo = function () {
            $rootScope.account = window.localStorage.account;
            CarCreditRestangular.all('accounts').all("authmenu").all($rootScope.account.id).getList().then(function (response) {
                angular.forEach(response, function (item) {
                    authResource[item.routepath] = 'all';
                })
                isAuth = true;
            });
        };
        this.resetPasswd = function (id) {
            var defered = $q.defer();
            CarCreditRestangular.all("accounts").all("resetPasswd").post(id).then(function (response) {
                defered.resolve();
            }, function (response) {
                defered.reject(response.message);
            });
            return defered.promise;
        }
    }]);
