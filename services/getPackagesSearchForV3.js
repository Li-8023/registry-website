// 调用V3版本 搜索接口
function getPackagesSearchForV3(dataString, callback) {
    var base_url = BASE_V3_URL
    if (dataString) {
        dataString = dataString + '&platform=3'
    } else {
        dataString = 'platform=3'
    }
    var url = base_url + '/packages/releases?'+ dataString
    _Get(url, function (result) {
        callback && callback(result)
        return ;
    })
}