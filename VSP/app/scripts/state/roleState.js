/**
 * Created by zhengam on 2017/2/27.
 * 描述：角色管理路由
 */
stateModule.config(function($stateProvider){
    $stateProvider
        .state('role',{
        url:'/role',
        templateUrl:'view/user/userIndex.html'
    })
        .state('role.list',{
            url:'/list',
            templateUrl:'view/role/roleList.html',
            controller:'RoleListCtrl'
        })
        .state('role.add',{
            url:'/add',
            templateUrl:'view/role/roleAdd.html',
            controller:'RoleAddCtrl'
        })
        .state('role.update',{
            url:'/update/:id',
            cache:false,            
            templateUrl:'view/role/roleUpdate.html',
            controller:'RoleUpdateCtrl'
        })
    ;
});