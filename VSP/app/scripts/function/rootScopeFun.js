/**
 * Created by zhengam on 2017/2/28.
 * 描述：$rootScope全局属性
 */

function getInitRootScope($rootScope,$state,$timeout){
    
    // var httpHosts =  "120.24.246.151:9996/api/";
    //var httpHosts =  "localhost:55830/api/";
    // var  httpHosts =  "192.168.1.5/api/";
    var  httpHosts =  "10.1.250.214/api/";   
    // var  httpHosts =  "192.168.1.2:9090/api/";
    //"http://120.24.246.151:9996/api/authority/login"
    $rootScope.http = "http://" + httpHosts + "authority/login";
    $rootScope.https = "http://" + httpHosts + "authority/loginmodel";
    // 用户管理模块
    $rootScope.getListUrl = "http://" + httpHosts + "userinfo/GetUserInfoPage";  // 获取用户列表
    $rootScope.userUpdateUrl = "http://" + httpHosts + "userinfo/ModifyUserInfo";  //修改用户
    $rootScope.userDetailUrl = "http://" + httpHosts + "userinfo/GetUserInfoByID"; /*通过用户ID获取用户详细信息*/
    $rootScope.userAddUrl = "http://" + httpHosts + "userinfo/AddUserInfo";     //新增用户
    $rootScope.setroleUrl = "http://" + httpHosts + "userinfo/setrole";     //设置角色
    $rootScope.getRoleListByIDUrl = "http://" + httpHosts + "userinfo/GetRoleListByUserID";     //根据用户id获取用户角色
    $rootScope.getAuthPathByIdUrl = "http://" + httpHosts + "authority/GetAuthPathAllByUid";     //根据用户id获取用户权限

    

    // 角色管理模块
    $rootScope.roleArrUrlUrl = "http://" + httpHosts + "role/GetRoleList";
    $rootScope.roleAddUrl = "http://" + httpHosts + "role/AddRoleInfo";
    $rootScope.roleUpdateUrl = "http://" + httpHosts + "Role/ModifyRoleInfo";
    $rootScope.roleDetailUrl = "http://" + httpHosts + "role/GetRoleInfoByID";
    $rootScope.roleSearchUrl = "http://" + httpHosts + "role/GetRolePage";   // 组合查询获取角色列表

    //产品管理模块
    $rootScope.productSearchUrl = "http://" + httpHosts + "product/GetProductPage";// 组合查询获取产品列表
    $rootScope.productAddUrl = "http://" + httpHosts + "product/AddProduct";
    $rootScope.productUpdateUrl = "http://" + httpHosts + "product/ModifyProduct";
    $rootScope.productDetailUrl = "http://" + httpHosts + "product/GetProductByID";
    $rootScope.supplierListUrl = "http://" + httpHosts + "product/GetAllSupplierList";
    $rootScope.getAllSuppliersUrl = "http://" + httpHosts + "product/GetAllSuppliers"; //获取所有供应商列表
    $rootScope.setSupplierUrl = "http://" + httpHosts + "product/SetProductSupplier"; //设置供应商列表

    //方案管理模块
    $rootScope.planSearchUrl = "http://" + httpHosts + "PlanInfo/GetPlanInfoPage";// 组合查询获取方案列表
    $rootScope.planAddUrl = "http://" + httpHosts + "PlanInfo/AddPlanInfo";
    $rootScope.planUpdateUrl = "http://" + httpHosts + "PlanInfo/ModifyPlanInfo";
    $rootScope.planDetailUrl = "http://" + httpHosts + "PlanInfo/GetPlanInfoByID";
    $rootScope.uploadFileUrl = "http://" + httpHosts + "file/PostFile";

    //集成设备管理模块
    $rootScope.deviceSearchUrl = "http://" + httpHosts + "device/GetDevicePage";// 组合查询获取设备列表
    $rootScope.deviceAddUrl = "http://" + httpHosts + "device/AddDevice";
    $rootScope.deviceUpdateUrl = "http://" + httpHosts + "device/ModifyDevice";
    $rootScope.deviceDetailUrl = "http://" + httpHosts + "device/GetDeviceByID";
    $rootScope.getAllProductListUrl = "http://" + httpHosts + "device/GetAllProductList";  //根据设备ID获取设备关联的产品列表
    $rootScope.setDeviceUrl = "http://" + httpHosts + "device/SetDeviceProduct";  //设置集成设备关联的产品

    //项目管理模块
    $rootScope.projectSearchUrl = "http://" + httpHosts + "project/GetProjectPage";// 组合查询获取项目列表
    $rootScope.projectAddUrl = "http://" + httpHosts + "project/AddProjectT";
    $rootScope.projectUpdateUrl = "http://" + httpHosts + "project/ModifyProjectT";
    $rootScope.projectDetailUrl = "http://" + httpHosts + "project/GetProjectByID";
    $rootScope.generateUrl = "http://" + httpHosts + "project/GenerateProductList"; //根据选择的集成设备生成产品列表
    $rootScope.saveProductListUrl = "http://" + httpHosts + "project/SaveProductList"; //保存产品清单
    $rootScope.getProductListUrl = "http://" + httpHosts + "project/GetProductList"; //根据项目ID获取关联产品清单

    //日志管理模块
    $rootScope.logSearchUrl = "http://" + httpHosts + "system/GetLogPage";

    //基本数据
    $rootScope.citySearchUrl = "http://" + httpHosts + "system/GetCitys"; //获取城市列表
    $rootScope.progmSearchUrl = "http://" + httpHosts + "system/GetProjectTypes";    //获取项目类型
    $rootScope.brandSearchUrl = "http://" + httpHosts + "system/GetBrands";   //获取品牌列表
    $rootScope.originSearchUrl = "http://" + httpHosts + "system/GetAreas";     //获取产地列表
    $rootScope.unitSearchUrl = "http://" + httpHosts + "system/GetUnits";     //获取单位列表
    $rootScope.authoritySearchUrl = "http://" + httpHosts + "authority/getfunctionlist";     //获取用户权限  
    $rootScope.roleListSearchUrl = "http://" + httpHosts + "system/GetRoleList";     //获取角色列表
    $rootScope.planListSearchUrl = "http://" + httpHosts + "system/GetPlanList";     //获取方案列表
    $rootScope.tableListSearchUrl = "http://" + httpHosts + "system/GetTableList";     //获取操作表名称集合
    $rootScope.getBuildAreasUrl = "http://" + httpHosts + "system/GetBuildAreas";   //获取建筑面积列表
    $rootScope.getDevicesByTypeUrl = "http://" + httpHosts + "device/GetDevices";   //获取各种类型下的集成设备列表


    //文件导出
    $rootScope.exportProductExcelUrl = "http://" + httpHosts + "file/ExportProductExcel?project_id=";   //生成并下载项目设备清单
    $rootScope.exportProjectPlanUrl = "http://" + httpHosts + "file/ExportProjectPlan?project_id=";   //下载项目方案
    $rootScope.exportZipFileUrl = "http://" + httpHosts + "file/ExportZipFile?project_id=";   //打包下载项目方案和设备清单

    $rootScope.dateSOptions = {
            locale: 'zh-cn',
            format: 'L',
            showClose: true,
            keepOpen: false
        };
    $rootScope.dateEOptions = {
            locale: 'zh-cn',
            format: 'L',
            showClose: true,
            keepOpen: false
    };

    $rootScope.user = {
        id:"",            //用户id
        phone:"",         //手机号
        password:"",        //密码
        email:"",      //邮箱
        name:"",       //用户名
        state:"1",        //0禁用 1启用 是否启用
        account:"",  //账号
        CityName:"",      //城市名
        sex:"",     //用户标签
        city:"",     //城市ID
    };

    $rootScope.cookiesArr = {name:"",pwd:"",city:"",Id:""}

    $rootScope.deviedTypeList = [
        {"ID": 1, "dictdata_name": "配电房"}, 
        {"ID": 2, "dictdata_name": "水泵房"}, 
        {"ID": 3, "dictdata_name": "配电柜"}, 
        {"ID": 4, "dictdata_name": "水泵"}, 
        {"ID": 5, "dictdata_name": "水池"}
    ]

    $rootScope.authList = {
        "auth1":false,
        "auth2":false,
        "auth3":false,
        "auth4":false,
        "auth5":false,
        "auth6":false,
        "auth7":false
    };

    $rootScope.setUser = function(data){

        $rootScope.user.id = data.id;
        $rootScope.user.phone = data.phone;
        $rootScope.user.email = data.email;
        $rootScope.user.password = data.password;
        $rootScope.user.name = data["name"];
        $rootScope.user.state = data["state"];
        $rootScope.user.account = data["account"];
        $rootScope.user.sex = data["sex"];
        $rootScope.user.city = data["city"];
        $rootScope.user.CityName = data["CityName"];
    }

    $rootScope.setCookies = function(data){
        $rootScope.cookiesArr.name = data.name;
        $rootScope.cookiesArr.pwd = data.password;
        $rootScope.cookiesArr.city = data.CityName;
        $rootScope.cookiesArr.Id = data.id;
    }
    $rootScope.setToast = function (content) {
        $rootScope.toast = true;
        $rootScope.toastCont = content;
        $timeout(function () {
            if ($rootScope.toast) {
                $rootScope.toast = false;
                $rootScope.toastCont = null;
            }
        }, 2 * 1000);
    };
}


