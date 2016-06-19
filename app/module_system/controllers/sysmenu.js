'use strict';

/* Controllers */
// signin controller
angular.module("pu.system.controllers")
    .controller('SysMenuController', ['$scope', '$rootScope', '$state', 'toaster', 'CarCreditRestangular', function ($scope, $rootScope, $state, toaster, CarCreditRestangular) {
        $scope.getList = function (params) {
            CarCreditRestangular.all('menus').getList(params).then(function(response){
                $scope.items =response;
            });
        };
        $scope.pageChanged = function () {
            $scope.getList();
        }
        $scope.save = function () {
            CarCreditRestangular.all('menus').post(this.item).then(function () {
                $state.go('app.sysmenu.list');
                toaster.pop('success', '操作提醒', '增加菜单成功');
            }, function () {

            })
        };
        $scope.detail = function (id) {
            CarCreditRestangular.one('menus', id).get().then(function (response) {
                $scope.item = response;
                $state.go('app.sysmenu.detail');
            })
        };
        $scope.modify = function () {
            $scope.item.save().then(function () {
                $state.go('app.sysmenu.list');
                toaster.pop('success', '操作提醒', '修改菜单成功');
            }, function () {

            })
        };
        $scope.delete = function () {
            $scope.item.remove().then(function () {
                $state.go('app.sysmenu.list');
                toaster.pop('success', '操作提醒', '删除菜单成功');
            }, function () {

            })
        }


    }])
;