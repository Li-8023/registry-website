// get方法 默认返回Body
function _Get(url, callback, type, async=false) {
    type = type || 'body'

    var xmlhttp = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open(
      "GET",
      url,
      async
    );
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var result = {};
        if (type === 'isAllData') {// get方法返回所有接口数据
          result = JSON.parse(xmlhttp.responseText)
          callback&&callback(result)
          return ;
        }

        if (type === 'response') { // get方法返回Response
          result = JSON.parse(xmlhttp.responseText).Response;
          callback&&callback(result)
          return ;
        }

        // get方法返回Body
        if (type === 'body') {
          result = JSON.parse(xmlhttp.responseText).body;
          callback&&callback(result)
          return ;
        }
      }else{
        try {
          callback&&callback(JSON.parse(xmlhttp.responseText));
        } catch {}
      }
    };
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send();
}


// _GetJSON: 方法传递json参数,默认返回接口所有数据
function _GetJSON(url, callback, async=false){
  var xmlhttp = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject("Microsoft.XMLHTTP");
xmlhttp.open("GET", url, async);
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var result = JSON.parse(xmlhttp.responseText);
    callback&&callback(result)
    return ;
  }
};
xmlhttp.setRequestHeader("Content-type", "application/json");
xmlhttp.send();
}