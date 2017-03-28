// (function (angular) {
    "use strict";

    var appMoudle = angular.module('vsp',[
        'ui.router',
        'ngCookies',
        'ngTip',
        'ae-datetimepicker',
        'ngFileUpload',
        'app.state',
        'app.controller',
        'app.service',
        'app.directive',
        'app.filter'
    ]);
    var stateModule = angular.module('app.state', []);
    var ctrlModule = angular.module('app.controller', []);
    var serviceModule = angular.module('app.service', []);
    var directiveModule = angular.module('app.directive', []);
    var filterModule = angular.module('app.filter', []);

// })(angular);

appMoudle.run(function($rootScope,$state,$http,$log,$location,$cookieStore,$timeout,$filter){
    $rootScope.key = '';    
	$rootScope.isLogin = false;
    $rootScope.nowDate = $filter('date')(new Date(), 'yyyy-MM-dd');
    // $rootScope.tipService = TipService;
    getInitRootScope($rootScope,$state,$timeout);
    // gFunSetlUserMsgFromLocal($rootScope,$state,$http);
    var user = $cookieStore.get("user_Msg");
    if(user != undefined){
        // $rootScope.setUser(user);
        $rootScope.CityName = user.city;
        $rootScope.userName = user.name;
        getBaseDate($rootScope,$state,$timeout,$http,$cookieStore);
    }
    console.log(!$rootScope.user.id);
    // console.log($rootScope.isLogin);
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        if(toState.name=='login')return;// 如果是进入登录界面则允许
        // 如果用户不存在
        if(!$rootScope.user || !$rootScope.user.token){
            event.preventDefault();// 取消默认跳转行为
            $state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
        }
    });

});

appMoudle.config(function(ngTipProvider){
     ngTipProvider.setDefaultTimeout(1000);
})
.controller('MainController',function($scope,ngTip){
    var vm = $scope.vm = {};
    vm.text = 'edit and tip';
    $scope.ngTip = ngTip;
    $scope.openTip = function(){
        ngTip.tip('tip message here','type');
    };
});

