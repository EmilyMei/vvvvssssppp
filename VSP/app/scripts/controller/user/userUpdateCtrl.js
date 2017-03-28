/**
 * Created by zhengam on 2017/2/27.
 * 描述：用户修改
 */
ctrlModule.controller("UserUpdateCtrl",["$scope","$rootScope","$state","$cookieStore","$stateParams","$http","Upload",
function($scope,$rootScope,$state,$cookieStore,$stateParams,$http,Upload){
    $scope.userUfrom = {
        name:''
    };
    $scope.loading = true;
    //根据id获取方案详情
    var url = $rootScope.userDetailUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {"id":$stateParams.id};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        $rootScope.loading = false;
        if(res.status == "200"){
            $scope.loading = false;
            $scope.userListId = res.data;
            $scope.userUfrom.city = $scope.userListId.city;
            $scope.userUfrom.name = $scope.userListId.name;
            $scope.userUfrom.sex = $scope.userListId.sex;
            $scope.userUfrom.account = $scope.userListId.account;
            $scope.userUfrom.email = $scope.userListId.email;
            $scope.userUfrom.phone = $scope.userListId.phone;
            $scope.userUfrom.state = $scope.userListId.state;
            $scope.userUfrom.remark = $scope.userListId.remark;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
    //修改用户信息后提交
    $scope.userSave = function(){
        var params = {
            id:$stateParams.id,
            state:$scope.userUfrom.state,
            sex:$scope.userUfrom.sex,
            city:$scope.userUfrom.city,
            phone:$scope.userUfrom.phone,
            email:$scope.userUfrom.email,
            remark:$scope.userUfrom.remark,
            modify:$cookieStore.get("user_Msg").Id,
            modify_date:$rootScope.nowDate
        };
        var ajax = new ajaxClass($http, $rootScope.userUpdateUrl,"post");
        ajax.data = params;
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };
        ajax.successCallback = function(res){
            $rootScope.loading = false;
            if(res.status == "200"){
                layer.msg(res.data.Message, {icon: 1});
                $state.go("user.list");
            }     
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
        
    }
}]);