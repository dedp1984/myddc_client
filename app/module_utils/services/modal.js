angular.module('pu.utils.services')
    .factory('modal', function ($uibModal) {
        return {
            print: function (scope, templateUrl, size, actionButtons, wintype) {
                var $uibModalInstance = $uibModal.open({
                    animation: true,
                    scope: scope,
                    backdrop: true,
                    templateUrl: 'module_utils/tpl/dialog-print.html',
                    controller: function ($scope) {
                        $scope.templateUrl = templateUrl;
                        $scope.print = function () {
                            window.print();
                            $uibModalInstance.close();
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.$on('onClose', function () {
                            console.log('recv close');
                            $uibModalInstance.dismiss('cancel');
                        })
                    },
                    size: size
                });
            },
            error: function (errmsg) {
                var $uibModalInstance = $uibModal.open({
                    animation: true,
                    backdrop: true,
                    resolve: {
                        error: function () {
                            return errmsg;
                        }
                    },
                    templateUrl: 'module_utils/tpl/dialog-error.html',
                    controller: function ($scope, error) {
                        $scope.errmsg = error;
                        $scope.print = function () {
                            window.print();
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.$on('onClose', function () {
                            console.log('recv close');
                            $uibModalInstance.dismiss('cancel');
                        })
                    }
                });
            },
            info: function (title, info) {
                var $uibModalInstance = $uibModal.open({
                    animation: true,
                    backdrop: true,
                    resolve: {
                        tips: function () {
                            return info;
                        },
                        title: function () {
                            return title
                        }
                    },
                    templateUrl: 'module_utils/tpl/dialog-info.html',
                    controller: function ($scope, tips, title) {
                        $scope.tips = tips;
                        $scope.title = title;
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.$on('onClose', function () {
                            console.log('recv close');
                            $uibModalInstance.dismiss('cancel');
                        })
                    }
                });
            },
            confirm: function (title, info) {
                var $uibModalInstance = $uibModal.open({
                    animation: true,
                    backdrop: true,
                    resolve: {
                        tips: function () {
                            return info;
                        },
                        title: function () {
                            return title
                        }
                    },
                    templateUrl: 'module_utils/tpl/dialog-confirm.html',
                    controller: function ($scope, tips, title) {
                        $scope.tips = tips;
                        $scope.title = title;
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.ok = function () {
                            $uibModalInstance.close();
                        }
                    }
                });
                return $uibModalInstance.result;
            },
            prompt:function(title,placeholder){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    backdrop:'false',
                    resolve: {
                        title: function () {
                            return title;
                        },
                        placeholder: function () {
                            return placeholder;
                        }
                    },
                    templateUrl: 'module_utils/tpl/dialog-prompt.html',
                    controller: function($scope,title,placeholder){
                        $scope.title=title;
                        $scope.placeholder=placeholder;
                        $scope.vm={};
                        $scope.ok=function(){
                            $uibModalInstance.close($scope.vm.result);
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                });
                return $uibModalInstance.result;
            },
            show:function(templateUrl,indata){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    backdrop:'false',
                    resolve: {
                        indata: function () {
                            return indata;
                        }
                    },
                    templateUrl: templateUrl,
                    controller: function($scope,indata){
                        $scope.vm={};
                        $scope.vm.indata=indata;
                        $scope.vm.outdata={};
                        $scope.ok=function(){
                            $uibModalInstance.close($scope.vm);
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                });
                return $uibModalInstance.result;
            }
        }
    })
