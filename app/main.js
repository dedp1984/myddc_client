angular.module("app")
    .controller("AppController", function ($scope,$window, AuthService, $rootScope, modal) {

        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        $scope.signup = function () {
            modal.confirm("操作提醒", "确认登出系统？").then(function () {
                AuthService.signup();
                $rootScope.$state.go("access.signin");
            })
        }
    })
