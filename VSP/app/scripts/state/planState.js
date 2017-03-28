/**
 * Created by zhengam on 2017/2/27.
 * 描述：方案管理路由
 */
stateModule.config(function($stateProvider){
    $stateProvider
        .state('plan',{
            url:'/plan',
            templateUrl:'view/user/userIndex.html'
        })
        .state('plan.list',{
            url:'/list',
            templateUrl:'view/plan/planList.html',
            controller:'PlanListCtrl'
        })
        .state('plan.add',{
            url:'/add',
            templateUrl:'view/plan/planAdd.html',
            controller:'PlanAddCtrl'
        })
        .state('plan.update',{
            url:'/update/:id',
            cache:false,
            templateUrl:'view/plan/planUpdate.html',
            controller:'PlanUpdateCtrl'
        })
    ;
});