function http(categroy,callback){
  wx.request({
    url: categroy,
    header: {
      'content-type': 'json'
    },
    success:function(res){
      callback(res);
    }
  })
}

module.exports = {
  http: http
}
