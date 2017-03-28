/**
 * Created by zhengam on 2017/2/27.
 * 描述：日志列表
 */
ctrlModule.controller("LogListCtrl",["$scope","$rootScope","$state","$http","$cookieStore","$filter",
    function($scope,$rootScope,$state,$http,$cookieStore,$filter){
        $scope.loglistform = {};
        function checklogForm(startDate,endDate){
            if(!startDate ||　!endDate)
                return;
            if($filter('date')(startDate,'yyyyMMdd') > $filter('date')(endDate,'yyyyMMdd')){
                layer.msg("开始时间不能大于结束时间", {icon: 0});
                return false;
            }
        }

        $scope.current_page = 1; 
        $scope.loglistform.table = "用户";
        $scope.getData = $scope.logSearch = function(){

            var startDate = $scope.loglistform.startTime &&  $filter('date')($scope.loglistform.startTime._d, 'yyyy-MM-dd') || "";
            var endDate = $scope.loglistform.endTime &&  $filter('date')($scope.loglistform.endTime._d, 'yyyy-MM-dd') || ""
            if(checklogForm(startDate,endDate) === false){
                return;
            }
            $scope.loading = true;
            
            var pageParam = {
                "PageIndex":$scope.current_page,
                "PageNumber":"10",
                "OperateTable":$scope.loglistform.table,
                "OperateType":$scope.loglistform.type,
                "Operator":$scope.loglistform.operator,
                "StartDate":startDate,
                "EndDate":endDate
            };
            var url = $rootScope.logSearchUrl;
            var ajax = new ajaxClass($http,url,"GET");
            ajax.params = pageParam;
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == "200"){
                    $scope.logList = res.data;
                    var totalItems = Math.ceil($scope.logList.TotalItems / 10)
                    $scope.totalpage = totalItems< 1 ? 1 : totalItems;
                }       
            };
            ajax.failureCallback = function(res){
                layer.msg('系统正在维护，请联系管理员', {icon: 0});
            };
            ajax.requestData();
        }
        $scope.getData();
        
}]);