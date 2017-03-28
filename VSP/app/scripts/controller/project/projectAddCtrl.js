/**
 * Created by zhengam on 2017/2/27.
 * 描述：新增项目
 */
ctrlModule.controller("ProjectAddCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter",
    function($scope,$rootScope,$state ,$http,$cookieStore,$filter){
        $scope.projectAform = {}
        $scope.checkprojectForm = function(){
            var flag = true;
            if(!$scope.projectAform.name){
                layer.msg("请输入设备名", {icon: 0});
                flag = false;
                return;
            }
            if(!$scope.projectAform.desc){
                layer.msg("请输入设备描述", {icon: 0});
                flag = false;
                return;
            }
            if(!$scope.projectAform.mode){
                layer.msg("请输入设备型号", {icon: 0});
                flag = false;
                return;
            }
            return flag;
        }
        $scope.projectAform.city = 5;
        $scope.projectAform.iscancel = 0;
        $scope.projectAform.projectType = 1;
        $scope.projectAform.area = 11;
        $scope.projectAform.projectPlan = "78F3F61B-53EE-4F58-9A09-DB83E355BBEF";
        $scope.projectAdd = function(){
            // if(!$scope.checkprojectForm()){
            //     return;
            // }
            var deviceList = [
                {"type":1,"Quantity":$scope.projectAform.num1,"DeviceID":$scope.projectAform.device1},
                {"type":2,"Quantity":$scope.projectAform.num2,"DeviceID":$scope.projectAform.device2},
                {"type":3,"Quantity":$scope.projectAform.num3,"DeviceID":$scope.projectAform.device3},
                {"type":4,"Quantity":$scope.projectAform.num4,"DeviceID":$scope.projectAform.device4},
                {"type":5,"Quantity":$scope.projectAform.num5,"DeviceID":$scope.projectAform.device5}
            ];
            console.log(deviceList);
            var params = {
                city:$scope.projectAform.city,
                project_name :$scope.projectAform.name,
                product_type:7,
                project_address:$scope.projectAform.address,
                plan_id:$scope.projectAform.projectPlan,
                project_type:$scope.projectAform.projectType,
                project_charger :$scope.projectAform.charger,
                build_area:$scope.projectAform.area,
                iscancel:$scope.projectAform.iscancel,
                creator:$cookieStore.get("user_Msg").Id,
                create_date:$rootScope.nowDate ,
                DeviceList:deviceList    
            };
                console.log(params);
            var url = $rootScope.projectAddUrl;
            var ajax = new ajaxClass($http,url,"POST");
            ajax.data = params;                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key")};            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                console.log(res);
            if(res.status == "200"){
                    layer.msg(res.data.Message, {icon: 1});
                    $state.go("project.list");
            }
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }
}]);