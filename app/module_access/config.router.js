'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                //登陆系统
                .state('access.signin', {
                    url: '/signin',
                    templateUrl: 'module_access/tpl/signin.html',
                    controller: 'SigninFormController',
                    onEnter: function () {
                        window.localStorage.removeItem('Authorization');
                    }
                })
                //登出操作
                .state('access.signup', {
                    url: '/signup',
                    templateUrl: 'module_access/tpl/page_signup.html',
                    controller: 'SignupFormController'
                })
                //登陆修改弱密码
                .state('access.modifyweakpasswd', {
                    url: '/modifyweakpasswd',
                    templateUrl: 'module_access/tpl/modifyweakpasswd.html',
                    controller: 'ModifyPasswdController'
                })
                //用户自行修改密码
                .state('access.modifypasswd', {
                    url: '/modifypasswd',
                    templateUrl: 'module_access/tpl/modifypasswd.html',
                    controller: 'ModifyPasswdController'
                })
        }
    ]
);