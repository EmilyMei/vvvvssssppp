/**
 * Created by zhengam on 2017/2/28.
 */
serviceModule.factory('TipService', ['$timeout', function($timeout) {
  return {
    message : null,
    type : null,
    setMessage : function(msg,type){

      this.message = msg;
      this.type = type;

      //提示框显示最多3秒消失
      var _self = this;
      $timeout(function(){
        _self.clear();
      },3000);
    },
    clear : function(){
      this.message = null;
      this.type = null;
    }
  };
}]);