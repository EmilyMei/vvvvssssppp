/**
 * Created by zhengam on 2017/2/27.
 * 描述：角色修改
 */
ctrlModule.controller("RoleUpdateCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter","$stateParams",
function($scope,$rootScope,$state ,$http,$cookieStore,$filter,$stateParams){
    $scope.roleUform = {};
    $scope.loading = true;
    //根据id获取方案详情
    var url = $rootScope.roleDetailUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {"id":$stateParams.id};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        console.log(res);
        if(res.status == "200"){
            $scope.loading = false;
            $scope.roleListId = res.data;
            $scope.roleUform.name = $scope.roleListId.role_name;
            $scope.roleUform.remark = $scope.roleListId.remark;
            $scope.roleUform.state = $scope.roleListId.state;
            $scope.list = $scope.roleListId.FunctionList;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();


    //修改用户信息后提交
    $scope.roleSave = function(){
       var vmList = [];
       for(var k in $scope.list){
            if($scope.list[k].IsCheck==true){
                vmList.push({"function_code":$scope.list[k].function_code});
            }
            for(var i in $scope.list[k].ChildList){
                if($scope.list[k].ChildList[i].IsCheck == true){
                    vmList.push({"function_code":$scope.list[k].ChildList[i].function_code});
                }
            }
       }
       console.log(vmList);
       var params = {
            id:$stateParams.id,
            role_name:$scope.roleUform.name,
            state:$scope.roleUform.state,
            remark:$scope.roleUform.remark,
            modify:$cookieStore.get("user_Msg").Id,
            modify_date:$rootScope.nowDate,
            FunctionList :vmList
        };
        console.log(params);
        var ajax = new ajaxClass($http,$rootScope.roleUpdateUrl,"Post");
        // var key = base64encode(username +":" + password);
        ajax.data = $.param(params);                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key"),'Content-Type':'application/x-www-form-urlencoded'};            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            console.log(res);
           if(res.status == "200"){
                layer.msg(res.data.Message, {icon: 1});
                $state.go("role.list");
           }
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
    }
}]);
