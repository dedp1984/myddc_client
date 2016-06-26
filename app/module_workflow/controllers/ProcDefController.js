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
        }
    })
;