// pages/detail/detail.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
      movieDetail:{}
  },
  onLoad: function (options) {
    var that = this;
    const url = app.moveurl + '/v2/movie/subject/' + options.id;
    util.http( url, function (res) {
      that.setData({
        movieDetail: res.data
      })
      wx.hideNavigationBarLoading()
    })
    
    this.videoCtx = wx.createVideoContext('video');
    this.videoCtx.play();
    wx.showNavigationBarLoading()
  }
})