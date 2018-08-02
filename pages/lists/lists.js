// pages/lists/lists.js
const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
    movies:[],
    num:0,
    title:"电影列表",
    URL:""
  },
  onLoad: function (options) {
    this.setData({
      options: options.total
    })
    switch(options.total){
      case "117":
        this.data.title = "即将上映";
        this.data.url = app.moveurl + '/v2/movie/coming_soon';
        this.getHttp(this.data.url)
      break;
      case "24":
        this.data.title = "正在热映";
        this.data.url = app.moveurl + '/v2/movie/in_theaters';
        this.getHttp(this.data.url)
      break;
      case "250":
        this.data.title = "Top250";
        this.data.url = app.moveurl + '/v2/movie/top250';
        this.getHttp(this.data.url)
      break
    }
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
    wx.showNavigationBarLoading()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      this.setData({
        num: 0
      })
      this.getHttp(this.data.url +'?start = 0 && count=20')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      wx.showNavigationBarLoading();
      var that = this;
      this.setData({
        num: this.data.num += 20
      })
      util.http(this.data.url+'?start=' + this.data.num+'&&count=20', function (res) {
        that.setData({
          movies: that.data.movies.concat(res.data.subjects)
        })
        wx.hideNavigationBarLoading();
      })
  },
  movieDetail: function (data) {
    console.log(data.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + data.currentTarget.dataset.id
    })
  },
  getHttp:function(url){
    var that = this;
    util.http(url, function (res) {
      that.setData({
        movies: res.data.subjects
      })
      wx.hideNavigationBarLoading();
    })
  }
})