'use strict';

/* Controllers */
angular.module("pu.workflow.controllers")
    .controller("ProcDefController", function ($scope, CarCreditRestangular, $state, $rootScope, modal, toaster) {

        $scope.initList = function () {
            $scope.items = CarCreditRestangular.all("/workflow/taskconfig/procdef").getList().$object;
        };
        $scope.showProcDefTasks = function (item) {
            $scope.procdefItem = item;
            $scope.curProcDefId=item.proc_def_id;
            $state.go("app.procdef.tasks");
        };
        $scope.taskconfig = function (item) {
            $scope.curTask=item;
            $scope.curTaskId=item.taskId;
            $scope.readTaskConfig($scope.curProcDefId,$scope.curTaskId);
            $scope.accounts = CarCreditRestangular.all("accounts").getList().$object;
        };
        $scope.readTaskConfig=function(procDefId,taskDefKey){
            CarCreditRestangular.one("/workflow/taskconfig").
                get({"proc_def_id": procDefId, "task_def_key": taskDefKey}).then(function (response) {
                    if (angular.isUndefined(response)) {
                        $scope.taskItem = {};
                        $scope.taskItem.assigneeWay = "1";
                        $scope.taskItem.formkey="";
                        $scope.taskItem.rules = [{seq: 1, assigneeUserid: "", ruleScript: ""}];
                        $scope.taskItem.procDefId=$scope.curProcDefId;
                        $scope.taskItem.taskDefKey=$scope.curTaskId;
                    } else {
                        $scope.taskItem = response;
                        if($scope.taskItem.rules==null){
                            $scope.taskItem.rules = [{seq: 1, assigneeUserid: "", ruleScript: ""}];
                        }
                    }
                });
        };
        $scope.addOne = function (index) {
            $scope.taskItem.rules.push({seq: $scope.taskItem.rules.length + 1, assigneeUserid: "", ruleScript: ""});
        };
        $scope.delOne = function (index) {
            if ($scope.taskItem.rules.length == 1) {
                $scope.taskItem.rules = [{seq: 1, formkey:"",assigneeUserid: "", ruleScript: ""}];
            } else {
                $scope.taskItem.rules.splice(index, 1);
                //重新计算showseq
                for (var idx = 0; idx < $scope.tpl.tplDtls.length; idx++) {
                    $scope.taskItem.rules[idx].seq = idx + 1;
                }
            }
        };
        $scope.save = function () {
            CarCreditRestangular.all("/workflow/taskconfig").post($scope.taskItem).then(function(response){
                $scope.readTaskConfig($scope.curProcDefId,$scope.curTaskId);
                toaster.pop('success', '操作提醒', '设置参数成功');
            })
        };
        $scope.setRuleScript=function(rule){
            modal.show("module_workflow/tpl/task-rulescript.html",rule).then(function(response){
                console.log(response);
            })
        }
    })
;