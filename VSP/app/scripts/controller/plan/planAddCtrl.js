/**
 * Created by zhengam on 2017/2/27.
 * 描述：新增用户
 */
ctrlModule.controller("PlanAddCtrl",["$scope","$rootScope","$state","$http","$cookieStore",
    function($scope,$rootScope,$state,$http,$cookieStore){
        $scope.planAform = { };
        $scope.showFile = false;
        $scope.uploadFile = function(){
            
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
                    $scope.showFile = true;
                    $scope.planAform.file = res;
                    layer.msg("文件上传成功", {icon: 1});
                },error:function(){
                    layer.msg('系统正在维护，请联系管理员', {icon: 0});
                }
            });
            
        }
        $scope.checkPlanForm = function(){
            var flag = true;
            if(!$scope.planAform.name){
                layer.msg("请输入方案名", {icon: 0});
                flag = false;
                return;
            }
            if(!$scope.planAform.desc){
                layer.msg("请输入方案描述", {icon: 0});
                flag = false;
                return;
            }
            if(!$scope.planAform.file){
                layer.msg("请上传附件", {icon: 0});
                flag = false;
                return;
            }
            return flag;
        }
        $scope.planAform.isdefault = 0;
        $scope.planAform.iscancel = 0;
        $scope.planAdd = function(){
             if(!$scope.checkPlanForm()){
                return;
            }
            var params = {
                PlanName :$scope.planAform.name,
                PlanDesc:$scope.planAform.desc,
                AttachAddress :$scope.planAform.file,
                isdefault:$scope.planAform.isdefault,
                iscancel:$scope.planAform.iscancel,
                creator:$cookieStore.get("user_Msg").Id,
                create_date:$rootScope.nowDate    
            };
            var url = $rootScope.planAddUrl;
            var ajax = new ajaxClass($http,url,"POST");
            ajax.data = params;                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key")};            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
            if(res.status == "200"){
                    layer.msg(res.data.Message, {icon: 1});
                    $state.go("plan.list");
            }
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }
}]);