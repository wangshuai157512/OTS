const app = getApp()
const wechat = app.globalData.wechat

import request from '../../utils/request'
import api from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      query : {}
  },

    startExam () {
        let isFace = this.data.query.takePhotoInTest
        let id = this.data.query.id
        if (isFace == 1) {
          wx.navigateTo({
            url: `/pages/faceDistinguish/faceDistinguish?id=${id}`
          })
        } else {
            wx.navigateTo({
                url: `/pages/examinationItem/examinationItem?id=${id}`
            })
        }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title : options.name })
    this.setData({
        query : options
    })
  },
})
