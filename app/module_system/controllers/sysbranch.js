'use strict';

/* Controllers */
// signin controller
angular.module("pu.system.controllers")
    .controller('SysBranchController', ['$scope', '$rootScope', '$state', 'toaster', 'CarCreditRestangular', function ($scope, $rootScope, $state, toaster, CarCreditRestangular) {
        $scope.getList = function (params) {
            $scope.items = CarCreditRestangular.all('branchs').getList(params).$object;
        };
        $scope.pageChanged = function () {
            $scope.getList();
        }
        $scope.save = function () {
            CarCreditRestangular.all('branchs').post(this.item).then(function () {
                $state.go('app.sysbranchs.list');
                toaster.pop('success', '操作提醒', '增加经销商成功');
            }, function () {

            })
        };
        $scope.detail = function (id) {
            CarCreditRestangular.one('branchs', id).get().then(function (response) {
                $scope.item = response;
                $state.go('app.sysbranchs.detail');
            })
        };
        $scope.modify = function () {
            $scope.item.save().then(function () {
                $state.go('app.sysbranchs.list');
                toaster.pop('success', '操作提醒', '修改经销商成功');
            }, function () {

            })
        };
        $scope.delete = function () {
            CarCreditRestangular.one("branchs", $scope.selBranch.id).remove().then(function () {
                $scope.getBranchTree();
                toaster.pop('success', '操作提醒', '删除机构成功');
            }, function () {

            })
        };
        $scope.getBranchTree = function () {
            $scope.branchTree = CarCreditRestangular.one("branchs", '0').get().$object;
        };
        $scope.$on("nodeClicked", function (event) {
            $scope.selBranch = event.targetScope.treeData;
            $scope.newBranch = {};
        });
        $scope.add = function () {
            $scope.newBranch.parentid = $scope.selBranch.id;
            CarCreditRestangular.all("branchs").post($scope.newBranch).then(function (response) {
                $scope.getBranchTree();
                toaster.pop('success', '操作提醒', '增加机构成功');
            })
        }


    }])
;