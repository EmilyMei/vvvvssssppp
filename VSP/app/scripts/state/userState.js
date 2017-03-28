/**
 * Created by zhengam on 2017/2/27.
 * 描述：用户路由
 */
stateModule.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index',{
        url:'/index',
        templateUrl:'view/user/userIndex.html',
        controllerProvider : function($rootScope,$state){
            if($rootScope.isLogin == false){
                $state.go('login');
            }
            return function(){};
        }
    })
    .state('login',{
        url:'/login',
        templateUrl:'view/user/login.html',
        controller:'LoginCtrl'
    })
    .state('user',{
        url:'/user',
        templateUrl:'view/user/userIndex.html',
        controller:function($scope) {
        }
    })
    .state('user.list',{
        url:'/list',
        templateUrl:'view/user/userlist.html',
        controller:'UserListCtrl'
    })
    .state('user.add',{
        url:'/add',
        templateUrl:'view/user/userAdd.html',
        controller:'UserAddCtrl'
    })
    .state('user.update',{
        url:'/update/:id',
        cache:false,    //不缓存
        templateUrl:'view/user/userUpdate.html',
        controller:'UserUpdateCtrl'
    })
    ;
});