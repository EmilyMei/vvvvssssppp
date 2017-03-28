/**
 * Created by zhengam on 2017/2/27.
 * 描述：产品修改
 */
ctrlModule.controller("ProductUpdateCtrl",["$scope","$rootScope","$state","$cookieStore","$stateParams","$http",
function($scope,$rootScope,$state,$cookieStore,$stateParams,$http){
    $scope.productUform = { };
    $scope.loading = true;
    // 根据id获取产品详情
    var url = $rootScope.productDetailUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {"id":$stateParams.id};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
       
        $rootScope.loading = false;
        if(res.status == "200"){
            $scope.loading = false;
            $scope.productListId = res.data;
            $scope.productUform.name = $scope.productListId.name;
            $scope.productUform.model = $scope.productListId.model;
            $scope.productUform.brand = $scope.productListId.brand;
            $scope.productUform.type = $scope.productListId.type;
            $scope.productUform.origin = $scope.productListId.area;
            $scope.productUform.unit = $scope.productListId.unit;
            $scope.productUform.desc = $scope.productListId.tech_desc;
            $scope.productUform.price = $scope.productListId.price;
            $scope.productUform.month = $scope.productListId.maintain_term;
            $scope.productUform.desc = $scope.productListId.tech_desc;
            $scope.productUform.input = $scope.productListId.input;
            $scope.productUform.output = $scope.productListId.output;
		
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
    // 修改产品信息后提交
    $scope.checkProductForm = function(){
        var flag = true;
        if(!$scope.productUform.name){
            layer.msg("请输入产品名", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.productUform.model){
            layer.msg("请输入万睿型号", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.productUform.origin){
            layer.msg("请输入产地名称", {icon: 0});
            flag = false;
            return;
        }
        return flag;
    }
    $scope.productSave = function(){
        if(!$scope.checkProductForm()){
            return;
        }
        var params = {
            id:$stateParams.id,
            name:$scope.productUform.name,
            brand:$scope.productUform.brand,
            model:$scope.productUform.model,
            area:$scope.productUform.origin,
            unit:$scope.productUform.unit,
            maintain_term:$scope.productUform.month,
            type:$scope.productUform.type,
            tech_desc:$scope.productUform.desc,
            modify:$cookieStore.get("user_Msg").Id,
            modify_date:$rootScope.nowDate,
            input:$scope.productUform.input,
            output:$scope.productUform.output,
	        price:$scope.productUform.price
        };
        var ajax = new ajaxClass($http, $rootScope.productUpdateUrl,"post");
        ajax.data = params;
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };
        ajax.successCallback = function(res){
            $rootScope.loading = false;
            if(res.status == "200"){
                layer.msg(res.data.Message, {icon: 1});
                $state.go("product.list");
            }     
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
        
    }
}]);