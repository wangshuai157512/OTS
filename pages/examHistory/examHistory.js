import api from '../../utils/api'
import request from '../../utils/request'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyFlag:false,
    pageSize:10,
    page:1,
    arrangements:[],
    idFlag:"idFlag",
    endloading:false
  },
  
  reviewpage:function(){
    let that = this
    that.getData();
  },
  getData:function(){
    let that = this;
    if(getApp().globalData.viewActivityTypeIds.length>0){
      let activityTypeIds = getApp().globalData.viewActivityTypeIds.toString()
      let param = {activityTypeIds:activityTypeIds,pageSize:that.data.pageSize,pageNo:that.data.page}
      request(api.studentTestActivityDetails,'post',param).then(res => {
        if(res){
          that.setData({
            arrangements:that.data.arrangements.concat(res.arrangements)  
          })
          if (res.arrangements.length < that.data.pageSize){ 
            console.log('已经加载完了')         
            that.setData({
              endloading:true
            })
          }
          let page = that.data.page + 1
          that.setData({
            page:page           
          })          
        }
      })
    }else{
      wx.showToast({
        title: '没有可查看的记录',
        icon: 'none',
        duration: 2000
      })
      wx.navigateBack()
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getData()
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
    var that = this;
    var endloading = that.data.endloading
    if (!endloading){
      that.reviewpage()  //页面上拉调用这个方法
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})