'use strict';

/* Controllers */
angular.module("pu.question.controllers")
    .controller("QuestionController",function($scope,$rootScope,CarCreditRestangular,QuestionRestangular,$state,$window,modal,toaster){
        $scope.getActivitys=function(){
            QuestionRestangular.all("/answerquestion/activity").getList().then(function(response){
                $scope.activitys=response;
                modal.show('module_question/tpl/question-selectactivity.html',$scope.activitys)
                    .then(function(response){
                        $scope.selectActDept(response.outdata.act);
                    },function(){
                        $rootScope.back();
                    })
            })
        }
        $scope.selectActDept=function(item){
            QuestionRestangular.one("/answerquestion/activity",item.id).get().then(function(response){
                modal.show('module_question/tpl/question-selectdept.html',response.actdepts)
                    .then(function(response){
                        $scope.selectQuestionTpl(response.outdata.dept);
                    },function(){
                        $rootScope.back();
                    })

            });
        };
        $scope.selectQuestionTpl=function(item){
            QuestionRestangular.one('/common').one('/systemDate').get().then(function(response){
               $scope.sysDate=response;
            });
            QuestionRestangular.one('/answerquestion/actdept',item.id).get().then(function(response){
                $scope.actdept=response;
                console.log(response);
                $state.go('question.enterdata');
            });
        };
        $scope.submit=function(){
            $scope.questionRslt=[];
            for(var i=0;i<$scope.actdept.tpl.length;i++){
                var obj={};
                var tpl=$scope.actdept.tpl[i];
                obj.tpldtlid=tpl.id;
                obj.actdeptid=$scope.actdept.id;
                obj.result=tpl.result;
                $scope.questionRslt.push(obj);
            }
            $scope.answer={};
            $scope.answer.result=$scope.questionRslt;
            modal.confirm('操作提醒','确认提交？')
                .then(function(){
                    QuestionRestangular.all('/answerquestion/submit').post($scope.answer).then(function(){
                        modal.info('操作提醒','提交数据成功');
                        $state.go('access.signin');
                    })
                })
        };
    })
;