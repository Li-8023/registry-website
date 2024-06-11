// V3 版本点击下载方法
function downloadV3Plugin(name) {
    // 获取 Package 的最新 GET
    // https://server-serverlgistry-v-awljqvnszb.cn-hangzhou.fcapp.run/v3/packages/{package-name}/release/latest
    var base_url = BASE_V3_URL
     var url = base_url + '/packages/'+name+'/release/latest'
     _Get(url, function (res) {
      if (res.body==="未找到指定资源") {
        alert('未找到指定资源')
        return;
      }
       var result = res.body||res.Response;
       if (result && result.zipball_url) {
         const link = document.createElement('a');
         link.setAttribute('href', result.zipball_url);
         link.setAttribute('target', "_blank");
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);      
       }
       return ;

     }, 'isAllData')
}