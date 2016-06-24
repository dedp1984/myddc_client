angular.module('fast',['fast.directive']);
angular.module('fast.directive',['fast.template']);
angular.module('fast.template',[]);
'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:grid
 * @description
 * # grid
 */
angular.module('fast.directive')
  .directive('grid', function () {
    return {
        restirct:'E',
        scope:{
            gridData:'='
        },
        replace:true,
        controller:function($scope){
            var rows=$scope.rows=[{headerText:'id'},{headerText:'姓名'},{headerText:'sex'}];

            this.addRow=function(row){
                rows.push(row);
            };
            $scope.$rowClicked=function(row){
                $scope.$emit('rowClicked',row);
            };
            $scope.generatePageSelector=function(curpageno,pagestep){
                $scope.pageSelector=[];
                var startIndex=curpageno-1>pagestep?curpageno-pagestep:1;
                var endIndex=$scope.totalpage-curpageno>pagestep?curpageno+pagestep:$scope.totalpage;
                for(var i=startIndex;i<=endIndex;i++) {
                    if (curpageno == i) {
                        $scope.pageSelector.push({class: 'active', pageno: i});
                    } else {
                        $scope.pageSelector.push({class: '', pageno: i});
                    }
                }
                if(startIndex!=1){
                    $scope.pageSelector.unshift({class: '', pageno: '...'});
                    $scope.pageSelector.unshift({class: '', pageno: 1});
                }
                if(endIndex!=$scope.totalpage){
                    $scope.pageSelector.push({class: '', pageno: '...'});
                    $scope.pageSelector.push({class: '', pageno: $scope.totalpage});
                }
            };
            //上一页
            $scope.prevPage=function(){
                if($scope.curpageno==1)
                    return;
                $scope.goPage(--$scope.curpageno);
            };
            //下一页
            $scope.nextPage=function(){
                if($scope.curpageno==$scope.totalpage)
                    return;
                $scope.goPage(++$scope.curpageno);
            };
            //跳转指定页
            $scope.goPage=function(pageno){
                $scope.curpageno=pageno;
                $scope.generatePageSelector($scope.curpageno,$scope.pagestep);
                $scope.breakGridData();

            };
            $scope.breakGridData=function(){
                var startIndex=($scope.curpageno-1)*$scope.pagesize;
                var endIndex=$scope.curpageno<$scope.totalpage?$scope.curpageno*$scope.pagesize:$scope.gridData.length;
                $scope.gridPageData=[];
                for(var i=startIndex;i<endIndex;i++){
                    $scope.gridPageData.push($scope.gridData[i]);
                }
            };
            $scope.init=function(){
                $scope.pagesize=10;
                $scope.totalpage=($scope.gridData.length%$scope.pagesize==0?$scope.gridData.length/$scope.pagesize:parseInt($scope.gridData.length/$scope.pagesize)+1);
				$scope.curpageno=1;
                $scope.pagestep=3;
                $scope.generatePageSelector($scope.curpageno,$scope.pagestep);
                $scope.breakGridData();
            };
            $scope.sendMessage=function(event,args){
                $scope.$emit(event,args);
            }
        },
        transclude:true,
        templateUrl:'templates/gridtemplate.html',
        link:function(scope,iEle,iAttr ,transclude){
            scope.init();
            scope.$watch('curpageno',function(newVal,oldVal){
                scope.enablePrev=newVal==1?'disabled':'';
                scope.enableNext=newVal==scope.totalpage?'disabled':'';
            })
        }
    }
});

'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:gridrow
 * @description
 * # gridrow
 */
angular.module('fast.directive')
  .directive('gridrow', function () {
    return {
        restrict:'E',
        replace:true,
        transclude:true,
        template:'<td ng-transclude></td>',
        compile:function(tEle,tAttr){
            return {
                pre:function(scope,iElement,iAttr){
                    scope.headerText=iAttr.headerText;
                    scope.valueField=iAttr.valueField;
                },
                post:function(scope,iEle,iAttr){
                    console.log('post link')
                }
            }
        }
    }
});

'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:innerTransclude
 * @description
 * # innerTransclude
 */
angular.module('fast.directive')
  .directive('innerTransclude', function () {
    return function(scope, iEle, $attrs, ctrl, transclude){
                transclude(scope, function(clone){
            iEle.append(clone);
        });
    }
});

'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:tree
 * @description
 * # tree
 */
angular.module('fast.directive')
  .directive('tree', function ($compile) {
        return {
            restrict: "E",
            scope: {
                treeData: '=',
                canChecked:'=',
                nameField:'@'
            },
            controller:function($scope){
              $scope.$itemClicked=function(item) {
                  $scope.$emit('nodeClicked');
              };
                $scope.$on('childNodeChecked',function(event){
                    if(event.targetScope!=event.currentScope){
                        event.currentScope.treeData.checked=false;
                        angular.forEach(event.currentScope.treeData.children,function(object){
                            if(object.checked==true){
                                event.currentScope.treeData.checked=true;
                            }
                        })
                        console.log(event.currentScope.treeData+" receive childNodeChecked Event")
                    }
                });
                $scope.$on('parentNodeChecked',function(event){
                    if(event.targetScope!=event.currentScope) {
                        event.currentScope.treeData.checked=event.targetScope.treeData.checked;
                        console.log(event.currentScope.treeData + " receive parentNodeChecked Event")
                    }
                });
                $scope.$isLeaf=function(item){
                    return item.children.length==0||!item.children;
                };
                $scope.$itemChecked=function(item){
                    $scope.$emit('childNodeChecked');
                    $scope.$broadcast('parentNodeChecked');
                };
                $scope.$getItemIcon=function(item){
                    if($scope.$isLeaf(item)){
                        return "glyphicon glyphicon-file";
                    };
                    return item.$$expanded==true?"glyphicon glyphicon-minus":"glyphicon glyphicon-plus";
                };
                $scope.$itemExpand=function(item){
                    item.$$expanded=!item.$$expanded;
                };

            },
            templateUrl:'templates/treenode.html',
            compile: function(tElement, tAttr) {
                var contents = tElement.contents().remove();
                var compiledContents;
                return function(scope, iElement, iAttr) {
                    if(!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    compiledContents(scope, function(clone, scope) {
                        iElement.append(clone);
                    });

                };
            }
        };
    });

angular.module('fast.template').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/gridtemplate.html',
    "<div><div class=\"panel panel-default\"><div class=\"panel-heading\">Panel heading</div></div><table class=\"table\"><thead><tr><td ng-repeat=\"row in rows\">{{row.headerText}}</td></tr></thead><tbody><tr ng-repeat=\"data in gridPageData\" ng-click=\"$rowClicked(data)\" inner-transclude></tr></tbody></table><div><ul class=\"pagination\"><li ng-class=\"enablePrev\" ng-click=\"prevPage()\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li><li ng-repeat=\"page in pageSelector\" class=\"{{page.class}}\"><a href=\"\" ng-click=\"goPage(page.pageno)\">{{page.pageno}}</a></li><li ng-class=\"enableNext\" ng-click=\"nextPage()\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></div></div>"
  );


  $templateCache.put('templates/treenode.html',
    "<i ng-class=\"$getItemIcon(treeData)\" ng-click=\"$itemExpand(treeData)\"></i> <span ng-click=\"$itemClicked(treeData)\"><input type=\"checkbox\" ng-if=\"canChecked\" ng-model=\"treeData.checked\" ng-change=\"$itemChecked(treeData)\"> {{treeData[nameField]}}</span><ul ng-show=\"treeData.$$expanded\" style=\"list-style: none\"><li ng-repeat=\"child in treeData.children\" style=\"padding-left: 25px;position: relative\"><tree tree-data=\"child\" can-checked=\"canChecked\" name-field=\"{{nameField}}\"></tree></li></ul>"
  );

}]);
