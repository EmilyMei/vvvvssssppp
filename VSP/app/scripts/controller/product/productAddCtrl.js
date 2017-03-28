/**
 * Created by zhengam on 2017/2/27.
 * 描述：新增产品
 */
ctrlModule.controller("ProductAddCtrl",["$scope","$rootScope","$state" , "$http","$cookieStore","$filter",
function($scope,$rootScope,$state ,$http,$cookieStore,$filter){

    $scope.productAform = { };

    $scope.checkProductForm = function(){
        var flag = true;
        if(!$scope.productAform.name){
            layer.msg("请输入产品名", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.productAform.model){
            layer.msg("请输入万睿型号", {icon: 0});
            flag = false;
            return;
        }
        if(!$scope.productAform.origin){
            layer.msg("请输入产地名称", {icon: 0});
            flag = false;
            return;
        }
        return flag;
    }
   
    $scope.productAform.brand = 7;
    $scope.productAform.origin = "中国深圳";
    $scope.productAform.unit = 9;
    $scope.productAform.type = 0;
    $scope.productAdd = function(){
         if(!$scope.checkProductForm()){
            return;
        }
       var params = {
            name:$scope.productAform.name,
            code:$scope.productAform.code,
            brand:$scope.productAform.brand,
            model:$scope.productAform.model,
            area:$scope.productAform.origin,
            unit:$scope.productAform.unit,
            maintain_term:$scope.productAform.month,
            type:$scope.productAform.type,
            tech_desc:$scope.productAform.desc,
            input:$scope.productAform.input,
            output:$scope.productAform.output,
            creator:$cookieStore.get("user_Msg").Id,
            create_date:$rootScope.nowDate,
	        price:$scope.productAform.price
            
        };
        var url = $rootScope.productAddUrl;
        var ajax = new ajaxClass($http,url,"POST");
        //ajax.data =$.param(params);                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
	    ajax.data = params;
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key")};            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
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