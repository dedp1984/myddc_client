'use strict';

/* Controllers */
angular.module("pu.question.controllers")
    .controller("DeptController",function($scope,CarCreditRestangular,modal,toaster){
        $scope.initList=function(){
            $scope.items=CarCreditRestangular.all("/question/dept").getList().$object;
        };
        $scope.addDept=function(){
            modal.prompt('增加部门','请输入部门名称').then(function(response){
                    CarCreditRestangular.all('/question/dept').post(response).then(function(response){
                        toaster.pop('success', '操作提醒', '增加部门成功');
                        $scope.initList();
                    })
                })
        };
        $scope.modifyDept=function(item){
            modal.prompt('编辑部门：'+item.deptname,'请输入部门名称')
                .then(function(response){
                    item.deptname=response;
                    item.save().then(function(response){
                        toaster.pop('success', '操作提醒', '修改部门成功');
                        $scope.initList();
                    })
                })
        };
        $scope.deleteDept=function(item){
            modal.confirm('操作确认','确认删除？')
                .then(function(){
                    item.remove().then(function(){
                        toaster.pop('success', '操作提醒', '删除部门成功');
                        $scope.initList();
                    })
                })

        }
    })
;