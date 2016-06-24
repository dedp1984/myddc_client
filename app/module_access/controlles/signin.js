'use strict';

/* Controllers */
// signin controller
angular.module('pu.access.controllers')
    .controller('SigninFormController', ['$scope', '$http', '$rootScope', '$state', 'AuthRestangular', 'CarCreditRestangular', 'AuthService',
        function ($scope, $http, $rootScope, $state, AuthRestangular, CarCreditRestangular, AuthService) {
            $scope.user = {};
            $scope.authError = null;
            $scope.login = function () {
                $scope.authError = null;
                AuthService.login($scope.user.id, $scope.user.passwd).then(function (response) {
                    if (AuthService.isWeakPasswd($scope.user.passwd)) {
                        $state.go('access.modifyweakpasswd');
                    } else {
                        $state.go('app.index');
                    }

                }, function (response) {
                    $scope.authError = response;
                })
            };
        }])
;