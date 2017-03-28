/**
 * Created by zhengam on 2017/2/27.
 * 描述：项目修改
 */
ctrlModule.controller("ProjectUpdateCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter","$stateParams",
    function($scope,$rootScope,$state ,$http,$cookieStore,$filter,$stateParams){
        $scope.projectUform = {};
        $scope.loading = true;
        //根据id获取方案详情
        var url = $rootScope.projectDetailUrl;
        var ajax = new ajaxClass($http,url,"GET");
        ajax.params = {"id":$stateParams.id};
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            console.log(res);
            if(res.status == "200"){
                $scope.loading = false;
                $scope.projectListId = res.data;
                $scope.projectUform.name = $scope.projectListId.project_name;
                $scope.projectUform.charger = $scope.projectListId.project_charger;
                $scope.projectUform.city = $scope.projectListId.city;
	    	$scope.projectUform.address = $scope.projectListId.project_address;
                $scope.projectUform.iscancel = $scope.projectListId.iscancle;
                $scope.projectUform.projectType = $scope.projectListId.project_type;
                $scope.projectUform.area = $scope.projectListId.build_area;
                $scope.projectUform.projectPlan = $scope.projectListId.plan_id;
                var DeviceList = $scope.projectListId.DeviceList;
                console.log(DeviceList.length);
                for(var k in DeviceList){
                    if(DeviceList[k].type == 1){
                        $scope.projectUform.num1 = DeviceList[k].Quantity;
                        $scope.projectUform.device1 = DeviceList[k].DeviceID;
                    }
                    if(DeviceList[k].type == 2){
                        $scope.projectUform.num2 = DeviceList[k].Quantity;
                        $scope.projectUform.device2 = DeviceList[k].DeviceID;
                    }
                    if(DeviceList[k].type == 3){
                        $scope.projectUform.num3 = DeviceList[k].Quantity;
                        $scope.projectUform.device3 = DeviceList[k].DeviceID;
                    }
                    if(DeviceList[k].type == 4){
                        $scope.projectUform.num4 = DeviceList[k].Quantity;
                        $scope.projectUform.device4 = DeviceList[k].DeviceID;
                    }
                    if(DeviceList[k].type == 5){
                        $scope.projectUform.num5 = DeviceList[k].Quantity;
                        $scope.projectUform.device5 = DeviceList[k].DeviceID;
                    }

                }
            }     
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
        //修改用户信息后提交
        $scope.projectSave = function(){
            $scope.loading = true;
            var deviceList = [
                {"type":1,"Quantity":$scope.projectUform.num1,"DeviceID":$scope.projectUform.device1},
                {"type":2,"Quantity":$scope.projectUform.num2,"DeviceID":$scope.projectUform.device2},
                {"type":3,"Quantity":$scope.projectUform.num3,"DeviceID":$scope.projectUform.device3},
                {"type":4,"Quantity":$scope.projectUform.num4,"DeviceID":$scope.projectUform.device4},
                {"type":5,"Quantity":$scope.projectUform.num5,"DeviceID":$scope.projectUform.device5}
            ];
            var params = {
                ID:$stateParams.id,
                city:$scope.projectUform.city,
                project_name :$scope.projectUform.name,
                product_type:7,
                project_address:$scope.projectUform.address,
                plan_id:$scope.projectUform.projectPlan,
                project_type:$scope.projectUform.projectType,
                project_charger :$scope.projectUform.charger,
                build_area:$scope.projectUform.area,
                iscancel:$scope.projectUform.iscancel,
                DeviceList:deviceList ,
                modify:$cookieStore.get("user_Msg").Id,
                modify_date:$rootScope.nowDate
            };
            console.log(params);
            var ajax = new ajaxClass($http, $rootScope.projectUpdateUrl,"post");
            ajax.data = params; 
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };
            ajax.successCallback = function(res){
                $rootScope.loading = false;
                if(res.status == "200"){
                    layer.msg(res.data.Message, {icon: 1});
                    $state.go("project.list");
                }     
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
            
        }
}]);