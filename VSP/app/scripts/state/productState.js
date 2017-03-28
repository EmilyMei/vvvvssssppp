/**
 * Created by zhengam on 2017/2/27.
 * 描述：产品管理路由
 */
stateModule.config(function($stateProvider){
    $stateProvider
        .state('product',{
            url:'/product',
            templateUrl:'view/user/userIndex.html'
        })
        .state('product.list',{
            url:'/list',
            templateUrl:'view/product/productList.html',
            controller:'ProductListCtrl'
        })
        .state('product.add',{
            url:'/add',
            templateUrl:'view/product/productAdd.html',
            controller:'ProductAddCtrl'
        })
        .state('product.update',{
            url:'/update/:id',
            cache:false,
            templateUrl:'view/product/productUpdate.html',
            controller:'ProductUpdateCtrl'
        })
        .state('product.supplier',{
            url:'/supplier/:id',
            templateUrl:'view/product/SupplierList.html',
            controller:'SupplierListCtrl'
        })
        
    ;
});