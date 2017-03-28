/**
 * Created by zhengam on 2017/2/27.
 * 描述：产品列表
 */
ctrlModule.controller("ProductListCtrl",["$scope","$rootScope","$state","$http","$cookieStore","$filter",
    function($scope,$rootScope,$state,$http,$cookieStore,$filter){
        $scope.productlistform = {};
        function checkProductForm(startDate,endDate){
            if(!startDate ||　!endDate)
                return;
            if($filter('date')(startDate,'yyyyMMdd') > $filter('date')(endDate,'yyyyMMdd')){
                layer.msg("开始时间不能大于结束时间", {icon: 0});
                return false;
            }
        }

        $scope.current_page = 1; 
        $scope.getData = $scope.productSearch = function(){
            $scope.productlistform.brand = "麦斯杰";
            var startDate = $scope.productlistform.startTime &&  $filter('date')($scope.productlistform.startTime._d, 'yyyy-MM-dd') || "";
            var endDate = $scope.productlistform.endTime &&  $filter('date')($scope.productlistform.endTime._d, 'yyyy-MM-dd') || ""
            if(checkProductForm(startDate,endDate) === false){
                return;
            }
            $scope.loading = true;
            var pageParam = {
                "PageIndex":$scope.current_page,
                "PageNumber":"10",
                "ProductName":$scope.productlistform.name,
                "Brand":$scope.productlistform.brand,
                "Model":$scope.productlistform.model,
                "SupplierName":$scope.productlistform.supplier,
                "StartDate":startDate,
                "EndDate":endDate
            };
            var url = $rootScope.productSearchUrl;
            var ajax = new ajaxClass($http,url,"GET");
            ajax.params = pageParam;
            // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
            ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
            ajax.successCallback = function(res){
                $scope.loading = false;
                if(res.status == "200"){
                    $scope.productList = res.data;
                    var totalItems = Math.ceil($scope.productList.TotalItems / 10)
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