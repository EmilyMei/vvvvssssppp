/**
 * Created by zhengam on 2017/3/1.
 */

/*
 * _http:angularJs中的$http对象
 * _url:ajax请求的URL
 * _method:请求方式：POST或GET
 * _params:GET方式请求时传递的参数
 * _data:POST方式请求时传递的参数
 * _responseType:在请求中设置XMLHttpRequestResponseType属性,""（字符串，默认）,
 * "arraybuffer"(ArrayBuffer);"blob"（blob对象）；"document"（HTTP文档）"json"(从JSON对象解析而来的JSON字符串)；
 * "text"（字符串）；"moz-blob"（Firefox的接收进度事件）；"moz-chunked-text"(文本流);"moz-chunked-arraybuffer"（ArrayBuffer流）。
 * 这个参数表示的含义就是服务器给页面返回的数据格式
 * _successCallback:请求成功的回调函数
 * _failureCallback:请求失败的回调函数
 *
*/
function ajaxClass(_http,_url,_method,_params,_headers,_data,_responseType,_successCallback,_failureCallback){
    this.http = _http
    this.url = _url || "";
    this.method = _method || "GET";
    this.params = _params || "";
    this.headers = _headers || "";
    this.data = _data || "";
    this.responseType = _responseType || "json";
    this.successCallback = _successCallback || function(res){
        };
    this.failureCallback = _failureCallback || function(res){

        };
    this.requestData = function (){
        this.http({
            method:this.method,
            url:this.url,
            params:this.params,
            data:this.data,
            headers : this.headers,
            responseType : this.responseType
        }).then(this.successCallback, this.failureCallback);
    }
}
/**
 * 1-4 获取基本数据
 */
function getBaseDate($rootScope,$state,$timeout,$http,$cookieStore){
    $rootScope.cityList = '';
    $rootScope.progmType = '';
    $rootScope.brandList = '';
    $rootScope.originList = '';
    $rootScope.unitList = '';
    $rootScope.authority = '';

    getCityList($rootScope,$state,$timeout,$http,$cookieStore);
    getProgmType($rootScope,$state,$timeout,$http,$cookieStore);
    getBrandList($rootScope, $state,$timeout,$http,$cookieStore);
    getAuthority($rootScope, $state,$timeout,$http,$cookieStore);
    getOriginList($rootScope, $state,$timeout,$http,$cookieStore);
    getUnitList($rootScope,$state,$timeout,$http,$cookieStore);
    getTableList($rootScope,$state,$timeout,$http,$cookieStore);
    getRoleSearchList($rootScope,$state,$timeout,$http,$cookieStore);
    getPlanSearchList($rootScope,$state,$timeout,$http,$cookieStore);
    getBuildAreas($rootScope,$state,$timeout,$http,$cookieStore);
    getDevicesByType($rootScope,$state,$timeout,$http,$cookieStore)
}

function gFunUploadFile(url,file,callback){
  var fd = new FormData();
  //fd.append("name", "upload_file");
  fd.append("file", file);

  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.open("POST",url);
  xhr.send(fd);
  function uploadProgress(evt){
    if (evt.lengthComputable){
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
      console.log("上传进度："+percentComplete.toString() + '%');
    }
    else{
      callback(0,"上传失败");
    }
  }
  function uploadComplete(evt){
    var obj = JSON.parse(evt.target.responseText);
    if(obj["code"]==1){
      callback(1,obj["msg"]);
    }
    else{
      callback(0,obj["msg"]);
    }
  }
  function uploadFailed(evt){
    callback(0,"");
  }

}


