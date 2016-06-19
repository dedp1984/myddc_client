
angular.module('pu.access.directives')
    .directive('validPasswd', function (AuthService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, ele, attrs, ngModelController) {
                $scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    if (newVal == oldVal)
                        return;
                    if (AuthService.isWeakPasswd(newVal)) {
                        ngModelController.$setValidity('valid', false);
                    } else {
                        ngModelController.$setValidity('valid', true);
                    }
                });
            }
        }
    });
