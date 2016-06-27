'use strict';

/* Controllers */
angular.module("pu.workflow.controllers")
    .controller("ProcDefController",function($scope,CarCreditRestangular,$state,$rootScope,modal,toaster){

        $scope.initList=function(){
            $scope.items=CarCreditRestangular.all("/workflow/taskconfig/procdef").getList().$object;
        };
        $scope.showProcDefTasks=function(item){
            $scope.procdefItem=item;
            $state.go("app.procdef.tasks");
        };
        $scope.taskconfig=function(item){
           // $scope.taskItem=CarCreditRestangular.one("/workflow/taskconfig").get({"proc_def_id":$scope.procdefItem.proc_def_id,"task_def_key":item.taskId}).$object;
            $scope.taskItem={};
            $scope.taskItem.assigneeWay="1";
            $scope.accounts=CarCreditRestangular.all("accounts").getList().$object;
        }
    })
;