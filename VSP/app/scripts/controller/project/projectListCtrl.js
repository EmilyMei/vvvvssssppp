/**
 * Created by zhengam on 2017/2/27.
 * 描述：用户列表
 */
ctrlModule.controller("ProjectListCtrl",["$scope","$rootScope","$state","$http","$cookieStore",
    function($scope,$rootScope,$state,$http,$cookieStore){
        $scope.current_page = 1; 
        $scope.getData = function(){
            $scope.loading = true;
            $scope.num = 0;
            var url = $rootScope.projectSearchUrl;
            var ajax = new ajaxClass($http,url,"GET");
            ajax.params = {"PageIndex":$scope.current_page,"PageNumber":"10"};
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == "200"){
                    $scope.projectList = res.data;
                    var totalItems = Math.ceil($scope.projectList.TotalItems / 10)
                    $scope.totalpage = totalItems< 1 ? 1 : totalItems;
                }       
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }
        $scope.getData();
        
        $scope.getId = function(id){
            $scope.nowId = id;
            
        }
        $scope.selected = []; //单选框选中的id集合
        $scope.selectedTags = [];

        //修改单选框选中集合
        var updateSelected = function(action,id,name){
            if(action == 'add' && $scope.selected.indexOf(id) == -1){
                    $scope.selected.push(id);
                    $scope.selectedTags.push(name);
                }
                if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
                    var idx = $scope.selected.indexOf(id);
                    $scope.selected.splice(idx,1);
                    $scope.selectedTags.splice(idx,1);
                }
            }
        
        $scope.updateSelection = function($event, id){
            $scope.selected = [];
            var checkbox = $event.target;
            var action = (checkbox.checked?'add':'remove');
            updateSelected(action,id,checkbox.name);
        }
    
        $scope.isSelected = function(id){
            return $scope.selected.indexOf(id)>=0;
        }
        $scope.export = function(){
            var url = ''; 
            //下载项目设备清单
            console.log($scope.selected);
            if($scope.selected == 0){
                url =  $rootScope.exportProductExcelUrl + $scope.nowId;
            }
            //下载项目方案
            if($scope.selected == 1){
                url =  $rootScope.exportProjectPlanUrl + $scope.nowId;
            }
            //打包下载项目方案和设备清单
            if($scope.selected == 2){
                url =  $rootScope.exportZipFileUrl + $scope.nowId;
            }
            console.log(url);
            window.open(url,"_blank");
        }
        
}]);