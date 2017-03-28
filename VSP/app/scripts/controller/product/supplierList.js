/**
 * Created by zhengam on 2017/2/27.
 * 描述：供应商列表
 */
ctrlModule.controller("SupplierListCtrl",["$scope","$rootScope","$state","$http","$cookieStore","$filter","$stateParams",
    function($scope,$rootScope,$state,$http,$cookieStore,$filter,$stateParams){
        $scope.productlistform = {};
        //获取产品供应商列表
        var url = $rootScope.supplierListUrl;
        var ajax = new ajaxClass($http,url,"GET");
        ajax.params =  {"id":$stateParams.id};
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            $scope.loading = false;
            if(res.status == "200"){
                $scope.supplierList = res.data;
            }       
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
        

        $scope.getsupplierList = function(){
            $scope.getData();
        }
        //获取所有供应商列表
        $scope.current_page = 1;
        $scope.getData = $scope.productSearch = function(){
            $scope.loading = true;
            var pageParam = {
                "PageIndex":$scope.current_page,
                "PageNumber":"10"
            };
            var url = $rootScope.getAllSuppliersUrl;
            var ajax = new ajaxClass($http,url,"GET");
            ajax.params = pageParam;
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == "200"){
                    $scope.getAllSuppliersList = res.data;
                    var totalItems = Math.ceil(res.data.length / 10)
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

         //保存新增的供应商
        
        $scope.addOk = function(){
            for(var i = 0 ; i < $scope.selected.length; i++){
                for(var j = 0; j < $scope.getAllSuppliersList.length; j++){
                    if($scope.getAllSuppliersList[j].ID == $scope.selected[i]){
                        var f = true;
                        $scope.supplierList.map(function(v){
                            if($scope.selected[i] == v.id){
                                f = false;
                                return;
                            }
                        })
                        if(f){
                            $scope.supplierList.push($scope.getAllSuppliersList[j]);
                        }
                        
                    }
                }
            }
        }

        //提交数据
        $scope.commitData = function(){
            var VMList = [];
            for(var i = 0; i < $scope.supplierList.length; i++){
                VMList.push({
                    "SupplierID":$scope.supplierList[i].SupplierID,
                    "Grade":$scope.supplierList[i].Grade,
                    "iscancel":$scope.supplierList[i].iscancel,
                    "isdefault":$scope.supplierList[i].isdefault,
                    "ori_price":$scope.supplierList[i].ori_price,
                    "ori_model":$scope.supplierList[i].ori_model
                });
            }
            var pageParam = {
                ProductID :$stateParams.id,
                VMList:VMList
            };
            var url = $rootScope.setSupplierUrl;
            var ajax = new ajaxClass($http,url,"POST");
            // ajax.params = pageParam;
            ajax.data = pageParam;                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == "200"){
                    layer.msg(res.data.Message, {icon: 1});
                    $state.go("product.list");
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