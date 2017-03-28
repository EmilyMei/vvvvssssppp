/**
 * Created by zhengam on 2017/2/27.
 * 描述：方案修改
 */
ctrlModule.controller("PlanUpdateCtrl",["$scope","$rootScope","$state","$cookieStore","$stateParams","$http","Upload",
function($scope,$rootScope,$state,$cookieStore,$stateParams,$http,Upload){
    $scope.planUfrom = {
        name:''
    };
    $scope.loading = true;
    $scope.showFile = true;
    //根据id获取方案详情
    var url = $rootScope.planDetailUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {"id":$stateParams.id};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        $scope.loading = false;
        if(res.status == "200"){
            $rootScope.loading = false;
            $rootScope.planListId = res.data;
            $scope.planUfrom.name = $rootScope.planListId.PlanName;
            $scope.planUfrom.desc = $rootScope.planListId.PlanDesc;
            $scope.planUfrom.defalut = $rootScope.planListId.isdefault;
            $scope.planUfrom.iscancel = $rootScope.planListId.iscancel;
            $scope.planUfrom.file = $rootScope.planListId.AttachAddress;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
    //上传文件
    $scope.uploadFile = function(){
            $scope.showFile = false;
            var fd = new FormData();
            fd.append("upload",1);
            fd.append('file',$('#file').get(0).files[0]);

            var url = $rootScope.uploadFileUrl;
            $.ajax({
                url:$rootScope.uploadFileUrl,
                type:'POST',
                data:fd,
                processData:false,
                contentType:false,
                success:function(res){
                    $scope.planUfrom.file = res;
                    layer.msg("文件上传成功", {icon: 1});
                },error:function(){
                    layer.msg('系统正在维护，请联系管理员', {icon: 0});
                }
            });
            
        }
     $scope.checkPlanForm = function(){
            var flag = true;
            if(!$scope.planUfrom.name){
                layer.msg("请输入方案名", {icon: 0});
                flag = false;
                return;
            }
            if(!$scope.planUfrom.desc){
                layer.msg("请输入方案描述", {icon: 0});
                flag = false;
                return;
            }
            return flag;
        }
    
    //修改方案后提交
    $scope.planSave = function(){
        if(!$scope.checkPlanForm()){
                return;
            }
        var params = {
	        ID:$stateParams.id,
            PlanName:$scope.planUfrom.name,
            PlanDesc:$scope.planUfrom.desc,
            AttachAddress:$scope.planUfrom.file,
            isdefault: $scope.planUfrom.defalut,
            iscancel: $scope.planUfrom.iscancel,
            modify:$cookieStore.get("user_Msg").Id,
            modify_date:$rootScope.nowDate,

        }
        var updateUrl = $rootScope.planUpdateUrl;
        var ajax = new ajaxClass($http,updateUrl,"post");
	    ajax.data = params;
        // ajax.params = {"id":$stateParams.id};
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            $rootScope.loading = false;
            if(res.status == "200"){
                layer.msg(res.Message, {icon: 1});
                $state.go('plan.list');
            }     
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
        
    }
}]);