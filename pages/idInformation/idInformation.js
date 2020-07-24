// pages/idInformation/idInformation.js
let app = getApp();
import api from '../../utils/api'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */

  data: {
    userName:"",
    certificateCode:""
    
  },
  startExam:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request(api.getStudentSimpleInformationByMini,'post',{studentId:app.globalData.userInfo.userId}).then(res => {
      if(res){
        this.setData({
          userName:res.name,
          certificateCode:res.certificateCode
        })
      }
      if(res.certificateCode==null){
        this.setData({
          certificateCode:""
        })
      }         
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})