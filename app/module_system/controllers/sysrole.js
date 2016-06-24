'use strict';

/* Controllers */
// signin controller
angular.module("pu.system.controllers").controller('SysRoleController', ['$scope', '$rootScope', '$state', 'toaster', 'CarCreditRestangular', function ($scope, $rootScope, $state, toaster, CarCreditRestangular) {
    $scope.getList = function (params) {
        $scope.items = CarCreditRestangular.all('sysroles').getList(params).$object;
    };
    $scope.pageChanged = function () {
        $scope.getList();
    }
    $scope.save = function () {
        CarCreditRestangular.all('sysroles').post(this.item).then(function () {
            $state.go('app.sysrole.list');
            toaster.pop('success', '操作提醒', '增加角色成功');
        }, function () {

        })
    };
    $scope.detail = function (id) {
        CarCreditRestangular.one('sysroles', id).get().then(function (response) {
            $scope.item = response;
            $state.go('app.sysrole.detail');
        })
    };
    $scope.modify = function () {
        $scope.item.save().then(function () {
            $state.go('app.sysrole.list');
            toaster.pop('success', '操作提醒', '修改角色成功');
        }, function () {

        })
    };
    $scope.delete = function () {
        $scope.item.remove().then(function () {
            $state.go('app.sysrole.list');
            toaster.pop('success', '操作提醒', '删除角色成功');
        }, function () {

        })
    };
    $scope.setauth = function (id) {
        CarCreditRestangular.all('menus').one('rolemenu', id).get().then(function (response) {
            $scope.rolemenu = response;
            $scope.treeData = $scope.rolemenu.menuTree;
            $state.go('app.sysrole.auth');
        })
    };

    $scope.saverolemenu = function () {
        $scope.rolemenu.save().then(function (response) {
            $state.go('app.sysrole.list');
            toaster.pop('success', '操作提醒', '设置角色权限成功');
        })
    }


}])
;