function _Post(url, queryString,callback) {
  var xmlhttp = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject("Microsoft.XMLHTTP");
xmlhttp.open(
  "POST",
  url,
  false
);
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var result = JSON.parse(xmlhttp.responseText).Response;
    callback&&callback(result)
    return ;
  }
};
xmlhttp.setRequestHeader(
  "Content-type",
  "application/x-www-form-urlencoded"
);
// var data = `keyword=${getQueryVariable("keyword")}`;
var data = queryString;
xmlhttp.send(data);
}