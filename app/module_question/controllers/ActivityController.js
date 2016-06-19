'use strict';

/* Controllers */
angular.module("pu.question.controllers")
    .controller("ActivityController",function($scope,CarCreditRestangular,$state,$rootScope,modal,toaster){

        $scope.initList=function(){
            $scope.items=CarCreditRestangular.all("/question/activity").getList().$object;
        };
        $scope.add=function(){
            $scope.depts=CarCreditRestangular.all("/question/dept").getList().$object;
            $scope.tpls=CarCreditRestangular.all("/question/template").getList().$object;
            $scope.activity={};
            $scope.activity.actdepts=[{deptid:'',tplid:''}];
            $state.go("app.question.activity.add");
        };
        $scope.save=function(){
            CarCreditRestangular.all('/question/activity').post($scope.activity).then(function(response){
                toaster.pop('success', '操作提醒', '增加活动成功');
                $rootScope.back();
            })
        };
        $scope.edit=function(item){
            $scope.depts=CarCreditRestangular.all("/question/dept").getList().$object;
            $scope.tpls=CarCreditRestangular.all("/question/template").getList().$object;
            CarCreditRestangular.one('/question/activity',item.id).get().then(function(response){
                $scope.activity=response;
                $state.go('app.question.activity.edit');
            })
        };
        $scope.update=function(){
            modal.confirm('操作确认','确认提交？')
                .then(function(){
                    $scope.activity.save().then(function(response){
                        toaster.pop('success', '操作提醒', '修改活动成功');
                        $state.go("app.question.activity.list");
                    })
                })
        }
        $scope.delete=function(item){
            modal.confirm('操作确认','确认删除？')
                .then(function(){
                    item.remove().then(function(){
                        toaster.pop('success', '操作提醒', '删除活动成功');
                        $state.reload();
                    });

                })
        };
        $scope.addOne=function(index){
            $scope.activity.actdepts.push({deptid:'',tplid:''});
        }
        $scope.delOne=function(index){
            if($scope.activity.actdepts.length==1){
                $scope.activity.actdepts=[{deptid:'',tplid:''}];
            }else{
                $scope.activity.actdepts.splice(index,1);
            }
        };
        $scope.getAcitvityScores=function(item){
            CarCreditRestangular.one("/question/activity/score",item.id).get().then(function(response){
                $scope.scores=response;
                $state.go('app.question.activity.showscore');
            })
        };
        $scope.exportToExcel=function(item){
            CarCreditRestangular.one("/question/excel",item.id).withHttpConfig({responseType: 'arraybuffer'}).get().then(function(response){
                console.log(response);
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                $scope.saveAs(blob, item.deptname +'-'+$scope.scores.activity.actname+ '.xls');
            });
        };
        $scope.saveAs=function(blob,fileName){
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, fileName);
            } else {
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
        }
    })
;