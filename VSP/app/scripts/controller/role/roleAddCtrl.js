/**
 * Created by zhengam on 2017/2/27.
 * 描述：新增用户
 */
ctrlModule.controller("RoleAddCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter",
function($scope,$rootScope,$state ,$http,$cookieStore,$filter,ngTip){

    $scope.roleAform = {
        name:""
    };
    var url = $rootScope.roleAddUrl;
    $scope.list = $rootScope.authority;
    $scope.checkUserForm = function(){
        var flag = true;
        if(!$scope.roleAform.name){
            layer.msg("请输入角色名", {icon: 0});
            flag = false;
            return;
        }
        return flag;
    }
   
    $scope.roleAform.state = 1;
    $scope.roleAdd = function(){
         if(!$scope.checkUserForm()){
            return;
        }
       var vmList = [];
       for(var k in $scope.list){
            if($scope.list[k].IsCheck == true){
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
            role_name:$scope.roleAform.name,
            state:$scope.roleAform.state,
            remark:$scope.roleAform.remark,
            creator:$cookieStore.get("user_Msg").Id,
            create_date:$rootScope.nowDate,
            FunctionList:vmList
        };
        console.log(params);
        var ajax = new ajaxClass($http,url,"Post");
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