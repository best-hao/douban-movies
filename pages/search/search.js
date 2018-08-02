const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  getHttp: function (url) {
    var that = this;
    util.http(url, function (res) {
      console.log(res)
      that.setData({
        movies: res.data.subjects
      })
      wx.hideNavigationBarLoading();
    })
  },
  search:function(){
    var url = app.moveurl +'/v2/movie/search?q=' + this.data.value;
    this.getHttp(url);
  },
  getValue:function(e){
      this.setData({
        value: e.detail.value
      })
  }
})