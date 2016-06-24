'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                //用户管理
                .state('app.sysaccounts', {
                    abstract: true,
                    url: '/sysaccounts',
                    template: '<div ui-view=""></div>',
                    controller: 'SysAccountController'
                })
                //用户管理-查询用户列表
                .state('app.sysaccounts.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysaccount-list.html',
                    controller: function ($scope) {
                        $scope.getAllSysAccounts();
                    }
                })
                //用户管理-增加用户
                .state('app.sysaccounts.add', {
                    url: '/add',
                    templateUrl: 'module_system/tpl/sysaccount-add.html',
                    controller: function ($scope, toaster, CarCreditRestangular) {

                    }
                })
                //用户管理-编辑用户
                .state('app.sysaccounts.detail', {
                    url: '/detail',
                    templateUrl: 'module_system/tpl/sysaccount-detail.html',
                    controller: function ($scope, toaster, CarCreditRestangular) {

                    }
                })
                //经销商管理
                .state('app.sysbranchs', {
                    abstract: true,
                    url: '/sysbranchs',
                    template: '<div ui-view=""></div>',
                    controller: 'SysBranchController'
                })
                //经销商管理-查询经销商列表
                .state('app.sysbranchs.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysbranch-list.html'
                })
                //经销商管理-增加经销商
                .state('app.sysbranchs.add', {
                    url: '/add',
                    templateUrl: 'module_system/tpl/sysbranch-add.html'
                })
                //经销商管理-编辑经销商
                .state('app.sysbranchs.detail', {
                    url: '/detail/:id',
                    templateUrl: 'module_system/tpl/sysbranch-detail.html'
                })
                //菜单管理
                .state('app.sysmenu', {
                    abstract: true,
                    url: '/sysmenu',
                    template: '<div ui-view=""></div>',
                    controller: 'SysMenuController'
                })
                //菜单管理-查询菜单列表
                .state('app.sysmenu.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysmenu-list.html',
                    controller: function ($scope) {
                        $scope.getList();
                    }
                })
                .state('app.sysmenu.add', {
                    url: '/add',
                    templateUrl: 'module_system/tpl/sysmenu-add.html'
                })
                .state('app.sysmenu.detail', {
                    url: '/detail',
                    templateUrl: 'module_system/tpl/sysmenu-detail.html'
                })
                .state('app.sysrole', {
                    abstract: true,
                    url: '/sysrole',
                    template: '<div ui-view=""></div>',
                    controller: 'SysRoleController'
                })
                .state('app.sysrole.list', {
                    url: '/list',
                    templateUrl: 'module_system/tpl/sysrole-list.html',
                    controller: function ($scope) {
                        $scope.getList();
                    }
                })
                .state('app.sysrole.add', {
                    url: '/add',
                    templateUrl: 'module_system/tpl/sysrole-add.html'
                })
                .state('app.sysrole.detail', {
                    url: '/detail',
                    templateUrl: 'module_system/tpl/sysrole-detail.html'
                })
                .state('app.sysrole.auth', {
                    url: '/auth',
                    templateUrl: 'module_system/tpl/sysrole-auth.html'
                })
        }
    ]
);