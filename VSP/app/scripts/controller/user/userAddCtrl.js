/**
 * Created by zhengam on 2017/2/27.
 * 描述：新增用户
 */
ctrlModule.controller("UserAddCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter",
function($scope,$rootScope,$state ,$http,$cookieStore,$filter,ngTip){

    $scope.userform = {
        name:""
    };
    var url = $rootScope.userAddUrl;

    $scope.checkUserForm = function(){
        var flag = true;
        if(!$scope.userform.name){
            layer.msg("请输入用户名", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.userform.account){
            layer.msg("请输入账号", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.userform.password){
            layer.msg("请输入密码", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.userform.repwd){
            layer.msg("请输入确认密码", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.userform.city){
            layer.msg("请选择城市", {icon: 0});
            flag = false;
            return;
        }
        if($scope.userform.password != $scope.userform.repwd){
            layer.msg("两次输入密码不一致", {icon: 0});
            flag = false;
            return;
        }
        
        return flag;
    }
   
    $scope.userform.sex = 0;
    $scope.userform.state = 1;
    $scope.userform.city = 5;
    // $scope.userSta = [{name:"是",id:1}, {name:"否",id:2}];
    $scope.userAdd = function(){
         if(!$scope.checkUserForm()){
            return;
        }
       var params = {
            name:$scope.userform.name,
            account:$scope.userform.account,
            password:hex_md5($scope.userform.password + "{vsp}"),
            state:$scope.userform.state,
            sex:$scope.userform.sex,
            city:$scope.userform.city,
            phone:$scope.userform.phone,
            email:$scope.userform.email,
            remark:$scope.userform.remark,
            creator:$cookieStore.get("user_Msg").Id,
            create_date:$rootScope.nowDate
            
        };
        var ajax = new ajaxClass($http,url,"Post");
	    ajax.data = params;
        // var key = base64encode(username +":" + password);
        // ajax.data = $.param($scope.params);                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key")};            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            console.log(res);
           if(res.status == "200"){
                layer.msg(res.Message, {icon: 1});
                $state.go("user.list");
           }
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
    }
    
}]);