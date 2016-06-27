'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
    ['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                //流程定义管理
                .state('app.procdef', {
                    abstract: true,
                    url: '/procdef',
                    template: '<div ui-view=""></div>',
                    controller: 'ProcDefController'
                })
                //流程定义管理-查询流程定义列表
                .state('app.procdef.list', {
                    url: '/list',
                    templateUrl: 'module_workflow/tpl/procdef-list.html'
                })
                //流程定义管理-查看流程任务信息
                .state('app.procdef.tasks', {
                    url: '/tasks',
                    templateUrl: 'module_workflow/tpl/procdef-tasks-list.html'
                })

        }
    ]
);