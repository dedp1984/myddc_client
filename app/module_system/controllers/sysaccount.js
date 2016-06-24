'use strict';
// signin controller
angular.module("pu.system.controllers")
    .controller('SysAccountController', ['$scope', '$rootScope', '$state', 'toaster', 'CarCreditRestangular', 'AuthService', 'modal',
        function ($scope, $rootScope, $state, toaster, CarCreditRestangular, AuthService, modal) {
            $scope.getAllSysAccounts = function (params) {
                $scope.items = CarCreditRestangular.all('accounts').getList(params).$object;
            };
            $scope.pageChanged = function () {
                $scope.getAllSysAccounts();
            }
            $scope.save = function () {
                this.item.roles = this.userRoles;
                CarCreditRestangular.all('accounts').post(this.item).then(function () {
                    $state.go('app.sysaccounts.list');
                    toaster.pop('success', '操作提醒', '增加用户成功');
                }, function () {

                })
            };
            $scope.detail = function (id) {
                CarCreditRestangular.one('accounts', id).get().then(function (response) {
                    $scope.item = response;
                    $state.go('app.sysaccounts.detail');
                })
            };
            $scope.modify = function () {
                this.item.roles = this.userRoles;
                $scope.item.save().then(function () {
                    $state.go('app.sysaccounts.list');
                    toaster.pop('success', '操作提醒', '修改用户成功');
                }, function () {

                })
            };
            $scope.delete = function () {
                $scope.item.remove().then(function () {
                    $state.go('app.sysaccounts.list');
                    toaster.pop('success', '操作提醒', '删除用户成功');
                }, function () {

                })
            };
            $scope.getSysBranchList = function () {
                $scope.branchs = CarCreditRestangular.all('branchs').all("list").getList().$object;
            };
            $scope.getAllSysRoles = function () {
                CarCreditRestangular.all('sysroles').getList().then(function (response) {
                    $scope.allSysRoles = response;
                });
            }

            $scope.selectSysRoles = function () {
                for (var i = 0; i < $scope.allSysRoles.length; i++) {
                    var item = $scope.allSysRoles[i];
                    if (item.id == this.sysRole) {
                        $scope.allSysRoles.splice(i, 1);
                        this.userRoles.push(item);
                    }
                }
            }

            $scope.selectUserRoles = function () {
                for (var i = 0; i < this.userRoles.length; i++) {
                    var item = this.userRoles[i];
                    if (item.id == this.userRole) {
                        this.userRoles.splice(i, 1);
                        $scope.allSysRoles.push(item);
                    }
                }
            }

            $scope.initUserRoles = function () {
                $scope.userRoles = [];
                CarCreditRestangular.all('sysroles').getList().then(function (response) {
                    //获取系统所有角色
                    $scope.allSysRoles = response;
                    //对用户的角色进行设置
                    var len = $scope.item.roles.length;
                    for (var i = 0; i < len; i++) {
                        var item = $scope.item.roles[i];
                        $scope.userRoles[i] = {id: item.roleid, rolename: item.rolename};
                        for (var j = 0; j < $scope.allSysRoles.length; j++) {
                            if (item.roleid == $scope.allSysRoles[j].id) {
                                $scope.allSysRoles.splice(j, 1);
                            }
                        }
                    }
                });

            };
            $scope.resetPasswd = function (id) {
                modal.confirm("操作提示", "确认重置用户" + id + "密码？").then(function () {
                    AuthService.resetPasswd(id).then(function (response) {
                        toaster.pop('success', '操作提醒', '重置密码成功');
                    })
                })
            }
        }])
;