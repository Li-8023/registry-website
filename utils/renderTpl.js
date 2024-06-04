function renderTpl(tplId, data, dom) {
    var html = template(tplId, data);
    // console.log(html)
    // 将拼接好的字符串显示在页面中
    $(dom).html(html);
  }
