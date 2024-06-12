// 调用V3版本 搜索接口
function getPackagesSearchForV3(dataString, callback, async=false) {
    var base_url = BASE_V3_URL
    var common_params = 'platform=3&page=-1'
    if (dataString) {
        dataString = dataString + '&'+ common_params
    } else {
        dataString = common_params;
    }
    var url = base_url + '/packages/releases?'+ dataString
    _Get(url, function (result) {
        callback && callback(result)
        return ;
    }, null, async)
}
var V3_SEARCH_TYPE = {
    Component:1,    // 组件
    Plugin: 2,      // 插件
    Project: 3,     // 应用
    Application: 3, // 应用
}