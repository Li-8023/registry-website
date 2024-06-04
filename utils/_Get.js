function _Get(url, callback, isAllData) {
    var xmlhttp = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open(
      "GET",
      url,
      false
    );
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        if (isAllData) {
          var result = JSON.parse(xmlhttp.responseText)
          callback&&callback(result)
          return ;
        }
        var result = JSON.parse(xmlhttp.responseText).body;
        callback&&callback(result)
      }
    };
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send();
}