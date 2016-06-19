'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.question', {
                    url: '/question',
                    abstract: true,
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                //调查部门管理
                .state('app.question.dept', {
                    url: '/dept/list',
                    templateUrl: 'module_question/tpl/detp-list.html',
                    controller: 'DeptController'
                })
                .state('app.question.template', {
                    url: '/template',
                    abstract: true,
                    template: '<div ui-view class="fade-in-right-big smooth"></div>',
                    controller: 'TemplateController'
                })
                .state('app.question.template.list', {
                    url: '/list',
                    templateUrl: 'module_question/tpl/template-list.html'
                })
                .state('app.question.template.add', {
                    url: '/add',
                    templateUrl: 'module_question/tpl/template-add.html'
                })
                .state('app.question.template.edit', {
                    url: '/edit',
                    templateUrl: 'module_question/tpl/template-edit.html'
                })
                .state('app.question.activity', {
                    url: '/activity',
                    abstract: true,
                    template: '<div ui-view class="fade-in-right-big smooth"></div>',
                    controller: 'ActivityController'
                })
                .state('app.question.activity.list', {
                    url: '/list',
                    templateUrl: 'module_question/tpl/activity-list.html'
                })
                .state('app.question.activity.add', {
                    url: '/add',
                    templateUrl: 'module_question/tpl/activity-add.html'
                })
                .state('app.question.activity.edit', {
                    url: '/edit',
                    templateUrl: 'module_question/tpl/activity-edit.html'
                })
                .state('app.question.activity.showscore',{
                    url:'/showscore',
                    templateUrl:'module_question/tpl/activity-score.html'
                })
                .state('question', {
                    url: '/question',
                    abstract: true,
                    template: '<div ui-view class="fade-in-right-big smooth"></div>',
                    controller: 'QuestionController'
                })
                .state('question.index',{
                    url:'/index',
                    templateUrl:'module_question/tpl/question-index.html'
                })
                .state('question.selectactivity', {
                    url: '/selectactivity',
                    templateUrl: 'module_question/tpl/question-selectactivity.html'
                })
                .state('question.selectdept', {
                    url: '/selectdept',
                    templateUrl: 'module_question/tpl/question-selectdept.html'
                })
                .state('question.enterdata', {
                    url: '/enterdata',
                    templateUrl: 'module_question/tpl/question-enterdata.html'
                })
        }
    ]
);