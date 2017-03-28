/**
 * Created by zhengam on 2017/2/27.
 * 描述：登录控制器
 */
ctrlModule.controller("LoginCtrl",["$scope","$rootScope","$state","$http","$cookieStore","$timeout",
function($scope,$rootScope,$state,$http,$cookieStore,$timeout){
    $scope.form = {};
    $scope.isHide = true;
    $scope.checkForm = function(){
        var flag = true;
        if(!$scope.form.username){
            $scope.isHide = false;
            $rootScope.tip = "请输入用户名";
            flag = false;
            return;
        }
        if(!$scope.form.pwd){
            $scope.isHide = false;
            $rootScope.tip = "请输入密码";
            flag = false;
            return;
        }
        return flag;
    }
    //用户权限设置
    getUserAuth = function(id){
        var ajax = new ajaxClass($http,$rootScope.getAuthPathByIdUrl,"Get");
	    ajax.params = {"id":id};
        // var key = base64encode(username +":" + password);
        // ajax.data = $.param($scope.params);                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key")};            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
           if(res.status == "200"){
               for(var k in res.data){
                   if(res.data[k].function_code == '100100'){
                        $rootScope.authList.auth1 = true;
                   }
                   if(res.data[k].function_code == '100200'){
                        $rootScope.authList.auth2 = true;
                   }
                   if(res.data[k].function_code == '100300'){
                        $rootScope.authList.auth3 = true;
                   }
                   if(res.data[k].function_code == '100400'){
                        $rootScope.authList.auth4 = true;
                   }
                   if(res.data[k].function_code == '100500'){
                        $rootScope.authList.auth5 = true;
                   }
                   if(res.data[k].function_code == '100600'){
                        $rootScope.authList.auth6 = true;
                   }
                   if(res.data[k].function_code == '100700'){
                        $rootScope.authList.auth7 = true;
                   }
               }
                // layer.msg(res.Message, {icon: 1});
           }
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
    }
    //用户登录
    $scope.login = function(){
        if(!$scope.checkForm()){
            return;
        }
        var password = hex_md5($scope.form.pwd + "{vsp}")
        var username = $scope.form.username;
        var data = {"UserName":username,"Password":password};
        var key = base64encode(username +":" + password);
        $rootScope.key = base64encode(username +":" + password);
        $http({
            method:'post',
            url:$rootScope.https,
            data:data
            }).success(function(response,status){
            if(response.Status == 1){
                $state.go("user.list");
                $rootScope.isLogin == true;
                $rootScope.setCookies(response.Data);
                $rootScope.setUser(response.Data);
                localStorage.setItem("user",JSON.stringify($rootScope.user));
                $cookieStore.put("user_Msg",$rootScope.cookiesArr);
                $cookieStore.put("user_Key",$rootScope.key);
                $rootScope.CityName = $cookieStore.get("user_Msg").city;
                $rootScope.userName = $cookieStore.get("user_Msg").name;
                getUserAuth(response.Data.id);
            }else{
                $rootScope.isLogin == false;
                layer.msg(response.Message + ',请确认用户名或密码是否输入正确', {icon: 0});
            }
               
                
        }).error(function(response){
                $rootScope.isLogin == false;
                $scope.isHide = false; 
                layer.msg('系统正在维护，请联系管理员', {icon: 0});  
            });
        }
        //退出登录
        $rootScope.toLoginOut = function(){
            // console.log($rootScope.isLogin);
            $rootScope.user = {};
            $rootScope.isLogin == false;
            localStorage.setItem("user",null);
            // $cookieStore.put("user_Msg",null);
            // $cookieStore.put("user_Key",null);
        }

}]);