'use strict';

/* Controllers */
angular.module("pu.question.controllers")
    .controller("TemplateController", function ($scope, CarCreditRestangular, $state,modal,toaster) {
       // $scope.sels = [{id: '10', msg: '很好'}, {id: '5', msg: '好'}, {id: '3', msg: '一般'}, {id: '0', msg: '差'}];
        $scope.seltyps=[{id:'1',name:'单项选择题'},{id:'2',name:'填空题'}];
        $scope.initList = function () {
            $scope.items = CarCreditRestangular.all("/question/template").getList().$object;
        };
        $scope.add = function () {
            $scope.sels=CarCreditRestangular.all("/question/template/sels").getList().$object;
            $scope.tpl = {};
            $scope.tpl.tplDtls = [{showseq: 1, content: '', val: []}];
            $state.go("app.question.template.add");
        };
        $scope.save = function () {
            CarCreditRestangular.all('/question/template').post($scope.tpl).then(function (response) {
                toaster.pop('success', '操作提醒', '增加模板成功');
                $state.go('app.question.template.list');
            })
        };
        $scope.edit = function (item) {
            CarCreditRestangular.one('/question/template', item.id).get().then(function (response) {
                $scope.tpl = response;
                $scope.sels=CarCreditRestangular.all("/question/template/sels").getList().$object;
                $state.go('app.question.template.edit');
            })
        };
        $scope.update = function () {
            modal.confirm('操作确认','确认提交？')
                .then(function () {
                    $scope.tpl.save().then(function (response) {
                        toaster.pop('success', '操作提醒', '修改模板成功');
                        $state.go("app.question.template.list");
                    })
                })
        }
        $scope.delete = function (item) {
            modal.confirm('操作确认','确认删除？')
                .then(function () {
                    item.remove().then(function () {
                        toaster.pop('success', '操作提醒', '删除模板成功');
                        $state.reload();
                    });

                })
        };
        $scope.addOne = function (index) {
            $scope.tpl.tplDtls.push({showseq: $scope.tpl.tplDtls.length+1, content: '', val: [],type:'1'});
        }
        $scope.delOne = function (index) {
            if ($scope.tpl.tplDtls.length == 1) {
                $scope.tpl.tplDtls = [{showseq: 1, content: '', val: [],type:'1'}];
            } else {
                $scope.tpl.tplDtls.splice(index, 1);
                //重新计算showseq
                for(var idx=0;idx<$scope.tpl.tplDtls.length;idx++){
                    $scope.tpl.tplDtls[idx].showseq=idx+1;
                }
            }
        }
        $scope.addModifyOne = function (index) {
            $scope.tpl.dtls.push({showseq:  $scope.tpl.dtls.length+1, content: '', val: "",type:'1'});
        }
        $scope.delModifyOne = function (index) {
            if ($scope.tpl.dtls.length == 1) {
                $scope.tpl.dtls = [{showseq: 1, content: '', val: "",type:'1'}];
            } else {
                $scope.tpl.dtls.splice(index, 1);
            }
        }
    })
;