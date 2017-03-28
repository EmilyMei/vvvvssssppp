/**
 * Created by zhengam on 2017/2/27.
 * 描述：集成设备修改
 */
ctrlModule.controller("DeviceUpdateCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter","$stateParams",
function($scope,$rootScope,$state ,$http,$cookieStore,$filter,$stateParams){
    $scope.deviceUform = {};
    $scope.loading = true;
    //根据id获取方案详情
    var ajax = new ajaxClass($http,$rootScope.deviceDetailUrl,"GET");
    ajax.params = {"id":$stateParams.id};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $scope.loading = false;
            $scope.deviceListId = res.data;
            $scope.deviceUform.name = $scope.deviceListId.name;
            $scope.deviceUform.model = $scope.deviceListId.model;
            $scope.deviceUform.desc = $scope.deviceListId.desc;
            $scope.deviceUform.iscancel = $scope.deviceListId.iscancel;
            $scope.deviceUform.isdefault = $scope.deviceListId.isdefault;
            $scope.deviceUform.type = $scope.deviceListId.type;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();

    //修改用户信息后提交
    $scope.deviceSave = function(){
        $scope.loading = true;
        var params = {
            ID:$stateParams.id,
            name:$scope.deviceUform.name,
            model:$scope.deviceUform.model,
            type:$scope.deviceUform.type,
            desc:$scope.deviceUform.desc,
            isdefault:$scope.deviceUform.isdefault,
            iscancel:$scope.deviceUform.iscancel,
            modify:$cookieStore.get("user_Msg").Id,
            modify_date:$rootScope.nowDate
        };
        var ajax = new ajaxClass($http, $rootScope.deviceUpdateUrl,"post");
        ajax.data = params;
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };
        ajax.successCallback = function(res){
            $rootScope.loading = false;
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