
//获取城市列表
function getCityList($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.citySearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.cityList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取项目类型
function getProgmType($rootScope, $state,$timeout,$http,$cookieStore){
    var url = $rootScope.progmSearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.ProgmType = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取品牌列表
function getBrandList($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.brandSearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.brandList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取产地权限
function getOriginList($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.originSearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.originList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取单位列表
function getUnitList($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.unitSearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.unitList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取用户权限
function getAuthority($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.authoritySearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.authority = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取操作表集合
function getTableList($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.tableListSearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.tableList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取角色列表
function getRoleSearchList($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.roleListSearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.roleSearchList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取方案列表
function getPlanSearchList($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.planListSearchUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.planSearchList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}

//获取建筑面积列表
function getBuildAreas($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.getBuildAreasUrl;
    var ajax = new ajaxClass($http,url,"GET");
    ajax.params = {};
    // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
    ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
    ajax.successCallback = function(res){
        if(res.status == "200"){
            $rootScope.areaSearchList = res.data;
        }     
    };
    ajax.failureCallback = function(res){
        layer.msg('系统正在维护，请联系管理员', {icon: 0});
    };
    ajax.requestData();
}
//获取各种类型下的集成设备列表
function getDevicesByType($rootScope,$state,$timeout,$http,$cookieStore){
    var url = $rootScope.getDevicesByTypeUrl;
        var ajax = new ajaxClass($http,url,"GET");
        ajax.params = { };
        // ajax.data = $.param({"id":"84341162-52C5-4FB0-A5AB-AE82966AA08D"});                // 传递表单数据的时候要使用$.param不然服务器没法正常捕获到发送的数据
        ajax.headers = { 'Authorization': 'Basic '+ $cookieStore.get("user_Key") };            // 千万记住要传递表单数据的时候设置请求头
        ajax.successCallback = function(res){
            if(res.status == "200"){
                $rootScope.getDevicesTypeList = res.data;
            }     
        };
        ajax.failureCallback = function(res){
            layer.msg('系统正在维护，请联系管理员', {icon: 0});
        };
        ajax.requestData();
}