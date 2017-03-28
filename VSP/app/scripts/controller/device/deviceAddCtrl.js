/**
 * Created by zhengam on 2017/2/27.
 * 描述：新增集成设备
 */
ctrlModule.controller("DeviceAddCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter",
    function($scope,$rootScope,$state ,$http,$cookieStore,$filter){
        $scope.deviceAform = {}
        $scope.checkdeviceForm = function(){
            var flag = true;
            if(!$scope.deviceAform.name){
                layer.msg("请输入设备名", {icon: 0});
                flag = false;
                return;
            }
            if(!$scope.deviceAform.desc){
                layer.msg("请输入设备描述", {icon: 0});
                flag = false;
                return;
            }
            if(!$scope.deviceAform.model){
                layer.msg("请输入设备型号", {icon: 0});
                flag = false;
                return;
            }
            return flag;
        }
        $scope.deviceAform.isdefault = 0;
        $scope.deviceAform.iscancel = 0;
        $scope.deviceAform.type = 0;
        $scope.deviceAdd = function(){
            if(!$scope.checkdeviceForm()){
                return;
            }
            var params = {
                model:$scope.deviceAform.model,
                name :$scope.deviceAform.name,
                type:$scope.deviceAform.type,
                desc :$scope.deviceAform.desc,
                isdefault:$scope.deviceAform.isdefault,
                iscancel:$scope.deviceAform.iscancel,
                creator:$cookieStore.get("user_Msg").Id,
                create_date:$rootScope.nowDate    
            };
            var url = $rootScope.deviceAddUrl;
            var ajax = new ajaxClass($http,url,"POST");
            ajax.data = params;                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key")};            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                if(res.status == "200"){
                        layer.msg(res.data.Message, {icon: 1});
                        $state.go("device.list");
                }
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }

}]);