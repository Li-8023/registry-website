function splitMaxLenth (dataStr, length) {
    length = length || 25;
    return dataStr.length > length ? dataStr.slice(0, length) + "...": dataStr;
}