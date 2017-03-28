/**
 * Created by zhengam on 2017/2/27.
 * 描述：
 */
directiveModule.directive('autoActive',['$location',function($location){
    return{
        link: function(scope, element, attributes){
            scope.loca = $location;
            scope.$watch('loca.url()',function(newValue,oldValue){
                var aLink = element.children().attr('href').substr(1);
                if(newValue.startsWith(aLink)){
                    element.parent().children().removeClass(attributes.autoActive);
                    element.addClass(attributes.autoActive);
                }
            })
        }
    };
}]);

// directiveModule.directive('dateFormat', ['$filter',function($filter) {
//     var dateFilter = $filter('date');
//     return {
//         require: 'ngModel',
//         link: function(scope, elm, attrs, ctrl) {

//             function formatter(value) {
//                 return dateFilter(value, 'yyyy-MM-dd'); //format
//             }

//             function parser() {
//                 return ctrl.$modelValue;
//             }

//             ctrl.$formatters.push(formatter);
//             ctrl.$parsers.unshift(parser);

//         }
//     };
// }]);


directiveModule.directive("myFileImg", [function ($http) {
  return {
    scope: {
      myFileImg: "=",
      toUpload:"&"
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.myFileImg= loadEvent.target.result;
            scope.toUpload({'fileUrl':changeEvent.target.files[0]});
          });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
}]);

directiveModule.directive('datepicker', function() {
              return {
              restrict: 'A',
              require: '?ngModel',
              // This method needs to be defined and passed in from the
              // passed in to the directive from the view controller
              scope: {                  
                select: '&'        // Bind the select function we refer to the right scope
              },
              link: function(scope, element, attrs, ngModel) {
                    if (!ngModel) return;            
                var optionsObj = {};            
                console.log("directive~~~~~"+JSON.stringify( ngModel));
                var updateModel = function(dateTxt) {
                  scope.$apply(function () {
                    // Call the internal AngularJS helper to
                    // update the two way binding
                    ngModel.$setViewValue(dateTxt);
                  });
                  console.log("after ngModel~~~~~"+JSON.stringify( ngModel));
                };
        
                optionsObj.onSelect = function(dateTxt, picker) {
                  updateModel(dateTxt);
                  if (scope.select) {
                    scope.$apply(function() {
                      scope.select({date: dateTxt});
                    });
                  }
                };
        
                ngModel.$render = function() {
                  // Use the AngularJS internal 'binding-specific' variable
                  element.datepicker('setDate', ngModel.$viewValue || '');
                };
                element.datepicker(optionsObj);
              }
            };
          });
//分页
  directiveModule.directive("page", [function () {
      return {
        restrict:"EA",
        template:'<div class="page pull-right"><ul  style="margin:0px;">'+
                '<li><button class="mybtn"  ng-click="goPage(1)">首页</button></li>'+
                '<li><button class="mybtn"  ng-click="goPage(currentPage - 1)">上一页</button></li>'+
                '<li><div class="txt"><span ng-bind="currentPage"</span></div></li>'+
                '<li><div class="txt">/<span ng-bind="totalPage"></span>页</div></li>'+
                '<li><button class="mybtn "  ng-click="goPage(currentPage + 1)">下一页</button></li>'+
                '<li><button class="mybtn "  ng-click="goPage(totalPage)">尾页</button></li></ul></div>',
        link:function(scope, element, attrs){

        },
        controller:function($http,$scope){
          // $scope.currentPage = 1;
          // $scope.totalPage = 10;
          $scope.goPage = function(nowPage){
            if(nowPage < 1 || nowPage > $scope.totalPage){
              return;
            }
            $scope.currentPage = nowPage;
          }
          $scope.$watch('currentPage', function(newVal, oldVal) {
            if(newVal != oldVal && newVal) $scope.getData();
          })
        },
        replace: true,
        scope: {
              totalPage: '=totalPage',
              currentPage: '=currentPage',
              getData: '&getData'
          },
      
      }
  }]);
//树形结构
  directiveModule.directive("lineCtrl" , function(){
    return {
      scope:{
        value:"=",
        list:"="
      },
      transclude:true,
      restrice: "EAC",
      template:"<li class='active' id='{{value.id}}'><input type='checkbox' ng-change='checkRule(value)' ng-model='value.IsCheck'/><span ng-click='showList($event)'>{{value.name}}</span><ul ng-transclude></ul> </li>",
      controller:function($scope){
        $scope.checkRule = function(_this ){
          if(_this.type != 0){  // 是子模块
              var pIndex = $scope.findFaterIndex(_this.parent_code);
              if(_this.IsCheck){  // 子模块全选影响父模块全选
                var borther = $scope.findBorther(_this), allCheck = true;
                borther.map(function(v){
                  if(!v.IsCheck){
                    allCheck = false;
                    return;
                  }
                })
                if(pIndex != -1 && allCheck){
                  $scope.list[pIndex].IsCheck = true;
                }
              }
              else{ // 子模块有一个不选就影响父模块为不选
                var pIndex = $scope.findFaterIndex(_this.parent_code);
                $scope.list[pIndex].IsCheck = false;
              }
          }else{  //父功能
             var thisIndex = $scope.findFaterIndex(_this.function_code);
             for(var i = 0 , len = $scope.list[thisIndex].ChildList.length ; i < len ; i++){
                $scope.list[thisIndex].ChildList[i].IsCheck = _this.IsCheck;
             }
             
          }
        }
        $scope.showList = function(event){
          event.target.parentNode.classList.toggle("active")
        }
        $scope.findFaterIndex = function(_pid){
          var index = -1;
          $scope.list.forEach(function(v , i){
            if(v.function_code == _pid){
              index = i;
              return;
            }
          })
          return index;
        }
        $scope.findBorther = function(_this){
          var arr = [] ;
          $scope.list.map(function(v){
            if(_this.parent_code === v.function_code){ // 寻找父标题对象
              v.ChildList.map(function(v1){  // 寻找父标题下的子标题
                if(v1.function_code != _this.function_code){
                  arr.push(v1);
                }
              })
              return ;
            }
          })
          return arr;
        }
      }
    }
  })

//角色设置
  directiveModule.directive("setrole" , function(){
    return {
      scope:{
        value:"=",
        list:"="
      },
      transclude:true,
      restrice: "EAC",
      template:"<li class='active' id='{{value.id}}'><input type='checkbox' ng-change='checkRule(value)' ng-model='value.IsCheck'/><span ng-click='showList($event)'>{{value.role_name}}</span></li>",
      controller:function($scope){
        $scope.checkRule = function(_this ){
        }
      }
    }
  })