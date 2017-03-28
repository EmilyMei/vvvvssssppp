/**
 * Created by zhengam on 2017/2/27.
 * 描述：用户列表
 */
ctrlModule.controller("UserListCtrl",["$scope","$rootScope","$state","$http","$cookieStore",
function($scope,$rootScope,$state,$http,$cookieStore){
    $scope.userlistform = {
        city:"深圳",
        state:"1",
        name:"",
        role:"",
    };
    $scope.current_page = 1; 
    //获取用户列表
    $scope.getData = $scope.getUserListTab = function(){ 
        $scope.loading = true;
        var pageParam = {
            "PageIndex":$scope.current_page,
            "PageNumber":"10",
            "UserName":$scope.userlistform.name,
            "RoleName":$scope.userlistform.role,
            "City":$scope.userlistform.city,
            "State":$scope.userlistform.state,
        };
        console.log(pageParam);
        var url = $rootScope.getListUrl;
        var ajax = new ajaxClass($http,url,"GET");
        ajax.params = pageParam;
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            $scope.loading = false;
            if(res.status == "200"){
                $scope.userList = res.data;
                var totalItems = Math.ceil($scope.userList.TotalItems / 10)
                $scope.totalpage = totalItems< 1 ? 1 : totalItems;
            }     
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
    }
     $scope.getData();
     $scope.selected = []; //复选框选中的id集合
     $scope.selectedTags = [];
    //用户角色设置
    $scope.setSave = function(){
        var VMList = [];
        var url = $rootScope.setroleUrl;
        for(var i = 0; i < $scope.userRoleListById.length; i++){
            if($scope.userRoleListById[i].IsCheck == true){
                VMList.push({id: $scope.userRoleListById[i].id});
            }
        }
        //
        var pageParam = {
                UserID :$scope.nowId,
                VMList:VMList
            };
            console.log(pageParam);
        var ajax = new ajaxClass($http,url,"post");
        ajax.data = pageParam;
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            $scope.loading = false;
            if(res.data.Status == 1){
                layer.msg(res.data.Message, {icon: 1});
                $state.go("user.list");
                $scope.getData();
            }else{
                layer.msg(res.data.Message, {icon: 0});
            }   
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
    }
    //获取当前用户已经设置的角色
    $scope.setOpen = function(id){
        $scope.nowId = id;
        var ajax = new ajaxClass($http,$rootScope.getRoleListByIDUrl,"GET");
        var pageParam = {id :$scope.nowId};
        console.log(pageParam);
        ajax.params = pageParam;
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            $scope.loading = false;
            if(res.status == 200){
                $scope.userRoleListById = res.data;
            }else{
                layer.msg(res.data.Message, {icon: 0});
            }   
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
        
    }
    
    
    //选择角色
    // $scope.checkRule = function(id){
    //     for(var i = 0; i < $scope.userRoleListById.length; i++){
    //         if($scope.userRoleListById[i].id == id){
    //             $scope.userRoleListById[i].IsCheck = !$scope.userRoleListById[i].IsCheck;
    //         }
    //     }
    //     console.log($scope.userRoleListById);
    // }
}]);