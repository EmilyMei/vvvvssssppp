/**
 * Created by zhengam on 2017/2/27.
 * 描述：方案列表
 */
ctrlModule.controller("PlanListCtrl",["$scope","$rootScope","$state","$http","$cookieStore",
    function($scope,$rootScope,$state,$http,$cookieStore){
        $scope.current_page = 1; 
        $scope.getData = function(){
            $scope.loading = true;
            var url = $rootScope.planSearchUrl;
            var ajax = new ajaxClass($http,url,"GET");
            ajax.params = {"PageIndex":$scope.current_page,"PageNumber":"10"};
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == "200"){
                    $scope.planList = res.data;
                    var totalItems = Math.ceil($scope.planList.TotalItems / 10)
                    $scope.totalpage = totalItems< 1 ? 1 : totalItems;
                }       
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }

        $scope.getData ();
}]);