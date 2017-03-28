/**
 * Created by zhengam on 2017/2/27.
 * 描述：日志管理路由
 */
stateModule.config(function($stateProvider){
    $stateProvider
        .state('log',{
            url:'/log',
            templateUrl:'view/user/userIndex.html'
        })
        .state('log.list',{
            url:'/list',
            templateUrl:'view/log/logList.html',
            controller:'LogListCtrl'
        })
    ;
});