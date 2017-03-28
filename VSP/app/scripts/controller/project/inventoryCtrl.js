/**
 * Created by zhengam on 2017/2/27.
 * 描述：项目配单
 */
ctrlModule.controller("InventoryCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter","$stateParams",
    function($scope,$rootScope,$state ,$http,$cookieStore,$filter,$stateParams){
        $scope.projectAform = {};
        $scope.loading = true;
        //根据id获取方案详情
        var url = $rootScope.projectDetailUrl;
        var ajax = new ajaxClass($http,url,"GET");
        ajax.params = {"id":$stateParams.id};
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            if(res.status =="200"){
                $scope.loading = false;
                $scope.projectListId = res.data;
                $scope.projectAform.name = $scope.projectListId.project_name;
                $scope.projectAform.charger = $scope.projectListId.project_charger;
                $scope.projectAform.city = $scope.projectListId.CityName;
                $scope.projectAform.iscancel = $scope.projectListId.iscancle;
                $scope.projectAform.projectType = $scope.projectListId.Project_TypeName;
                $scope.projectAform.area = $scope.projectListId.Build_AreaName;
                $scope.projectAform.projectPlan = $scope.projectListId.PlanName;
		        $scope.projectAform.address = $scope.projectListId.project_address;
                var DeviceList = $scope.projectListId.DeviceList;
                for(var k in DeviceList){
                    if(DeviceList[k].type == 1){
                        $scope.projectAform.num1 = DeviceList[k].Quantity;
                        $scope.projectAform.device1 = DeviceList[k].DeviceName;
                    }
                    if(DeviceList[k].type == 2){
                        $scope.projectAform.num2 = DeviceList[k].Quantity;
                        $scope.projectAform.device2 = DeviceList[k].DeviceName;
                    }
                    if(DeviceList[k].type == 3){
                        $scope.projectAform.num3 = DeviceList[k].Quantity;
                        $scope.projectAform.device3 = DeviceList[k].DeviceName;
                    }
                    if(DeviceList[k].type == 4){
                        $scope.projectAform.num4 = DeviceList[k].Quantity;
                        $scope.projectAform.device4 = DeviceList[k].DeviceName;
                    }
                    if(DeviceList[k].type == 5){
                        $scope.projectAform.num5 = DeviceList[k].Quantity;
                        $scope.projectAform.device5 = DeviceList[k].DeviceName;
                    }

                }
            }else{
                layer.msg(res.data.Message, {icon: 0});
            }     
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();


        //点击生成默认清单
        $scope.createList = function(){
            var ajax = new ajaxClass($http,$rootScope.generateUrl,"GET");
            ajax.params = {"id":$stateParams.id};
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                if(res.status =="200"){
                    $scope.loading = false;
                    $scope.generateListId = res.data;               
                }else{
                    layer.msg(res.data.Message, {icon: 0});
                }   
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }

        //根据id获取配单列表
        var ajax1 = new ajaxClass($http,$rootScope.getProductListUrl,"GET");
            ajax1.params = {"id":$stateParams.id};
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax1.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax1.successCallback = function(res){
                if(res.status =="200"){
                    $scope.loading = false;
                    $scope.generateListId = res.data;               
                }else{
                    layer.msg(res.data.Message, {icon: 0});
                }   
            };
            ajax1.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax1.requestData();

        //删除数据
        $scope.delSelection = function(id){
            for(var i = 0; i < $scope.generateListId.length ; i++){
                if(id == $scope.generateListId[i].ProductID){
                    $scope.generateListId.splice(i,1);
                }
            }
        }
        //提交数据
        $scope.commitData = function(){
            var VMList = [];
            for(var i = 0; i < $scope.generateListId.length; i++){
                VMList.push({
                    "ProductID":$scope.generateListId[i].ProductID,
                    "Quantity":$scope.generateListId[i].Quantity,
                    "Price":$scope.generateListId[i].Price
                });
            }
            var pageParam = {
                ID :$stateParams.id,
                ProductList:VMList
            };
            var url = $rootScope.saveProductListUrl;
            var ajax = new ajaxClass($http,url,"POST");
            // ajax.params = pageParam;
            ajax.data = pageParam;                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.data.Status == 1){
                    layer.msg(res.data.Message, {icon: 1});
                    $state.go("project.list");
                }else{
                    layer.msg(res.data.Message, {icon: 0});
                }       
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }

        //系数设置
        $scope.projectAform.factor = 1;
        $scope.setFactor = function(){
            if($scope.projectAform.factor < 1){
                layer.msg("输入系数不能小于1", {icon: 0});
                return;
            }
            for(var i = 0 ; i < $scope.generateListId.length; i++){
                $scope.generateListId[i].Price = ($scope.projectAform.factor * $scope.generateListId[i].Price).toFixed(2);
            }
            $scope.hideButton = true;
        }
        $scope.reSetFactor = function(){
            $scope.hideButton = false;
            for(var i = 0 ; i < $scope.generateListId.length; i++){
                $scope.generateListId[i].Price = ($scope.generateListId[i].Price / $scope.projectAform.factor).toFixed(2);
            }
        }
}]);