// pages/examList/examList.js

import api from '../../utils/api'
import request from '../../utils/request'
import wechat from '../../utils/wechat'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:3,
    status: 3,
    winWidth: 0,
    winHeight: 0,
    activityArrangements:[],
    activitytypeid:"",
    page:1,
    pageSize:10,
    isShowLoadmore:false,
    isShowNoDatasTips:false,
    endloading: false,
    takePhotoInTest:0,
    isSingleExamination:false,
    scrollHeight: 0
  },
  reviewpage:function(){
    let that = this
    that.getData();
  },
  changeFn:function(e){
    let that = this;
    that.setData({
      status:e.detail.current,
      activityArrangements:[],
      page:1,
      endloading:false,
    })
    that.getData()
  },
  swichNav: function( e ) {
    var that = this;
    let arr = []
    if( this.data.currentTab === e.target.dataset.current ) {
     return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      wechat.showLoading("加载中")
    }
   },
   catchTouchMove:function(res){
    return false
   },
  /**
   * 生命周期函数--监听页面加载
   */

  getData:function(){
    let that = this
    wechat.showLoading("加载中")
    let param = {
      coursecode:"",
      activitytypeid:that.data.activitytypeid,
      status:that.data.status,
      pageNo:that.data.page,
      pageSize:that.data.pageSize,
      answerWay:1
    }

    request(api.QueryStudentArrangementListByTypeIdAndCoursecode,'post',param).then(res => {

      if(res){
        that.setData({
          activityArrangements:that.data.activityArrangements.concat(res.ActivityArrangements)
        })
        if (res.ActivityArrangements.length < that.data.pageSize){
          // wechat.showToast("已经加载完了")
          that.setData({
            endloading:true
          })
        }
        let page = that.data.page + 1
        that.setData({
          page:page
        })
        wx.hideLoading()
      }
    })
  },
  enterExam:function(event){
    let that = this
    console.log(event)
    let name = event.currentTarget.dataset.name
    let count = event.currentTarget.dataset.count
    let id = event.currentTarget.dataset.id
    let time = event.currentTarget.dataset.time
    let takePhotoInTest =  that.data.takePhotoInTest
    // url: '../examList/examList?activitytypeid='+ activitytypeid +'',
    wx.navigateTo({
      url: '/pages/examinationInfo/examinationInfo?name='+ name +'&count=' + count +'&id=' + id +'&time=' + time +'&takePhotoInTest=' + takePhotoInTest +'',
    })
  },
  scrollBottom:function(){
    var that = this;
    var endloading = that.data.endloading
    if (!endloading){
      that.reviewpage()  //页面上拉调用这个方法
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title : options.name
    })
    that.setData({
      activitytypeid:options.activitytypeid,
      takePhotoInTest:options.takePhotoInTest,
      isSingleExamination:options.isSingleExamination
     })
    that.getData();

  /**
   * 获取系统信息
   */
  wx.getSystemInfo( {
   success: function( res ) {
    that.setData( {
     winWidth: res.windowWidth,
     winHeight: res.windowHeight-59,
     scrollHeight: res.windowHeight-59
    });
   }
  });
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
