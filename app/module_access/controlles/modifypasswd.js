'use strict';

/* Controllers */
angular.module('pu.access.controllers')
    .controller('ModifyPasswdController', ['$scope', '$http', '$rootScope', '$state', 'AuthRestangular', 'CarCreditRestangular', 'AuthService',
        function ($scope, $http, $rootScope, $state, AuthRestangular, CarCreditRestangular, AuthService) {
            $scope.user = {};
            $scope.errmsg = null;
            $scope.modifyWeakPasswd = function () {
                AuthService.modifyPasswd($scope.user.oldPasswd, $scope.user.newPasswd).then(function (response) {
                    $state.go('app.index');
                })
            };
            $scope.modifyPasswd = function () {
                AuthService.modifyPasswd($scope.user.oldPasswd, $scope.user.newPasswd).then(function (response) {
                    $state.go('access.signin');
                })
            }

        }])
;