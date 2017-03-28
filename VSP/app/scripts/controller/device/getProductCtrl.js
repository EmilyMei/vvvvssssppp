/**
 * Created by zhengam on 2017/2/27.
 * 描述：关联产品列表
 */
ctrlModule.controller("getProductCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter","$stateParams",
    function($scope,$rootScope,$state ,$http,$cookieStore,$filter,$stateParams){
          //获取已经关联产品列表
        $scope.current_page = 1; 
        $scope.loading = true;
        var url = $rootScope.getAllProductListUrl;
        var ajax = new ajaxClass($http,url,"GET");
        ajax.params = {"id":$stateParams.id};
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            $scope.loading = false;
            if(res.status == 200){
                $scope.getAllProductList = res.data;
            }else{
                layer.msg(res.data.Message, {icon: 0});
            }      
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();

        //获取产品列表
        $scope.getProductList = function(){
            $scope.getData();
        }
        $scope.getData = $scope.productSearch = function(){
            $scope.loading = true;
            var pageParam = {
                "PageIndex":$scope.current_page,
                "PageNumber":"10"
            };
            var url = $rootScope.productSearchUrl;
            var ajax = new ajaxClass($http,url,"GET");
            ajax.params = pageParam;
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == 200){
                    $scope.productList = res.data;
                    var totalItems = Math.ceil($scope.productList.TotalItems / 10)
                    $scope.totalpage = totalItems< 1 ? 1 : totalItems;
                }else{
                    layer.msg(res.data.Message, {icon: 0});
                }        
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }
        $scope.selected = []; //复选框选中的id集合
        $scope.selectedTags = [];

        //修改复选框选中集合
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
            var checkbox = $event.target;
            var action = (checkbox.checked?'add':'remove');
            updateSelected(action,id,checkbox.name);
        }
    
        $scope.isSelected = function(id){
            return $scope.selected.indexOf(id)>=0;
        }
        //保存新增的关联产品
        
        $scope.addOk = function(){
            for(var i = 0 ; i < $scope.selected.length; i++){
                for(var j = 0; j < $scope.productList.Items.length; j++){
                    if($scope.productList.Items[j].id == $scope.selected[i]){
                        var f = true;
                        $scope.getAllProductList.map(function(v){
                            if($scope.selected[i] == v.id){
                                f = false;
                                return;
                            }
                        })
                        if(f){
                            $scope.getAllProductList.push($scope.productList.Items[j]);
                        }
                        
                    }
                }
            }
        }

        $scope.delSelection = function(id){
            for(var i = 0; i < $scope.getAllProductList.length ; i++){
                if(id == $scope.getAllProductList[i].id){
                    $scope.getAllProductList.splice(i,1);
                }
            }
        }
        //提交数据
        $scope.commitData = function(){
            var VMList = [];
            for(var i = 0; i < $scope.getAllProductList.length; i++){
                VMList.push({"ProductID":$scope.getAllProductList[i].id,"Quantity":$scope.getAllProductList[i].Quantity});
            }
            var pageParam = {
                DeviceID :$stateParams.id,
                VMList:VMList
            };
            var url = $rootScope.setDeviceUrl;
            var ajax = new ajaxClass($http,url,"POST");
            // ajax.params = pageParam;
            ajax.data = pageParam;                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == 200){
                    layer.msg(res.data.Message, {icon: 1});
                    $state.go("device.list");
                }else{
                    layer.msg(res.data.Message, {icon: 0});
                }       
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }
}]);
