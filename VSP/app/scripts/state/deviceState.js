/**
 * Created by zhengam on 2017/2/27.
 * 描述：集成设备管理路由
 */
stateModule.config(function($stateProvider){
    $stateProvider
        .state('device',{
            url:'/device',
            templateUrl:'view/user/userIndex.html'
        })
        .state('device.list',{
            url:'/list',
            templateUrl:'view/device/deviceList.html',
            controller:'DeviceListCtrl'
        })
        .state('device.add',{
            url:'/add',
            templateUrl:'view/device/deviceAdd.html',
            controller:'DeviceAddCtrl'
        })
        .state('device.update',{
            url:'/update/:id',
            cache:false,
            templateUrl:'view/device/deviceUpdate.html',
            controller:'DeviceUpdateCtrl'
        })
        .state('device.product',{
            url:'/product/:id',
            cache:false,
            templateUrl:'view/device/getProduct.html',
            controller:'getProductCtrl'
        })
    ;
});