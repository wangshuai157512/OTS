//index.js
//获取应用实例
let app = getApp()

import api from '../../utils/api'
import request from '../../utils/request'

import regeneratorRuntime from '../../utils/regenerator-runtime/runtime'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    activityTypes:[]
  },
  openList:function(event){
    var activitytypeid = event.currentTarget.dataset.postid
    var takePhotoInTest = event.currentTarget.dataset.takephotointest //是否需要人脸识别
    var name = event.currentTarget.dataset.name
    var isSingleExamination = event.currentTarget.dataset.isSingleExamination//只能开启一个考试设置
    wx.navigateTo({
      url: '../examList/examList?activitytypeid='+ activitytypeid +'&takePhotoInTest=' + takePhotoInTest +'&name=' + name +'&isSingleExamination=' + isSingleExamination
    })
  },
  onLoad: function () {
    let param = {userid:app.globalData.userInfo.userId,answerWay:1}
    request(api.QueryActivityTypeListByStudentIdAndCourseCode,'post',param).then(res => {
      if(res){
        let newActivityTypes;
        for(var i in  res.ActivityTypes){
          res.ActivityTypes[i]["displayImg"] =   res.ActivityTypes[i]["displayImg"].substring(0,res.ActivityTypes[i]["displayImg"].length-4)
          if(res.ActivityTypes[i].viewDetailsOnPage){
            app.globalData.viewActivityTypeIds.push(res.ActivityTypes[i].id)
          }
        }
        this.setData({
          activityTypes : res.ActivityTypes
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    login.getCode().then(code => {
      let data = {
        code,
        encryptedData: e.detail.encryptedData,
        iv : e.detail.iv
      }

    })
  },
  getPhone (e) {
    login.getCode().then(code => {
      let data = {
        code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
      request('', 'post', data).then(res => {

      })
    })
  }
})
