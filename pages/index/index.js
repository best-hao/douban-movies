//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    comingSoon:{},
    inTheaters: {},
    top: {}
  },
  onLoad: function () {
    var that = this;
    util.http(app.moveurl + '/v2/movie/coming_soon?start=0&&count=3',function(res){
        console.log(res.data)
        that.setData({
          comingSoon: res.data
        })
    })
    util.http(app.moveurl + '/v2/movie/in_theaters?start=0&&count=3', function (res) {
        console.log(res.data)
        that.setData({
          inTheaters: res.data
        })
    })
    util.http(app.moveurl + '/v2/movie/top250?start=0&&count=3', function (res) {
      console.log(res.data)
      that.setData({
        top: res.data
      })
      wx.hideNavigationBarLoading()
    })
    wx.showNavigationBarLoading()
  },
  movieDetail:function(data){
    console.log(data.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + data.currentTarget.dataset.id
    })
  },
  movieNav: function (total){
    wx.navigateTo({
      url: '../lists/lists?total=' + total.currentTarget.dataset.total
    })
  }
  
})
