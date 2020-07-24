import api from '../../utils/api'
import request from '../../utils/request'
const md5 = require('../../utils/md5.js')
// import md5 from '../../utils/md5.js'
let app = getApp();
let tenantIndex;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginFirst:null,
    showTenant:false,
    showPassword:false,
    showCheckCode:false,
    showLogin:false,
    showWeiXinLogin:false,
    showSchool:true,
    loginParams: {},
    tenant:"",
    tenantName:"",
    multiTenant:[{tenant:-1,name:"请选择机构"}],
    userName:"",
    password:"",
    QRcodeTenant : null,
    tenantItem : null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   multiTenant:this.data.multiTenant.concat(app.globalData.miniTenant),
    //   loginFirst:app.globalData.loginFirst
    // })
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
    let sceneData = wx.getEnterOptionsSync()
    let scene = sceneData.scene
    console.log(sceneData.scene)
    if (scene === 1047 || scene === 1048 || scene === 1049 || scene === 1089) {
      let params = decodeURIComponent(sceneData.query.scene)
      app.globalData.tenant = params.split('=')[1]
      // this.globalData.tenant = '2222'
      console.log(app.globalData.tenant)
      let tenantList = JSON.parse(app.globalData.loginFirst.miniTenant || []),
          globalTenant = app.globalData.tenant
      this.setData({
        QRcodeTenant : globalTenant
      })
      let tenantItem = tenantList.filter(item => item.tenant === globalTenant)
      if (tenantItem && tenantItem.length > 0) {
        this.setData({
          tenant : tenantItem[0].tenant,
          tenantName : tenantItem[0].name,
          tenantItem
        })
      }
    }
    console.log(this.loginFirst);
    console.log(this.data.multiTenant);
    //是否显示机构
    // console.log(app.globalData);
    // if(app.globalData&&!app.globalData.showSchool){
    //   this.setData({
    //     showSchool:app.globalData.showSchool
    //   })
    // }
    this.loginInit();
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
    // wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.loginInit();
    console.log(this.data.loginParams)
    // wx.hideNavigationBarLoading(); //完成停止加载
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

  },
  pickCancel:function(){
    this.setData({
      showTenant:false
    })
  },
  pickShow:function(){
    this.setData({
      showTenant:true
    })
  },
  pickShowORHide:function(){
    if (this.data.QRcodeTenant && this.data.tenantItem && this.data.tenantItem.length > 0) return;
    this.setData({
      showTenant:!this.data.showTenant
    })
  },
  showPasswordFn:function(){
    this.setData({
      showPassword:!this.data.showPassword
    })
  },
  getPhoneNumber: function (e) {//获取手机号
    console.log(e);
    let checkStr = this.checkLoginFn();
    if(checkStr){
      if(e.detail.iv){
        this.data.loginParams.iv = e.detail.iv;
      }
      if(e.detail.encryptedData){
        this.data.loginParams.encryptedData = e.detail.encryptedData;
      }
      this.loginFunction();
    }
  },
  bindChange:function(e){
    tenantIndex = e.detail.value[0];
  },
  makeSureTenant:function(){
    this.setData({
      tenant:this.data.multiTenant[tenantIndex].tenant,
      tenantName:this.data.multiTenant[tenantIndex].name,
      showTenant:false
    })
    this.data.loginParams.tenantStr= this.data.multiTenant[tenantIndex].tenant;
    this.data.loginParams.method= this.data.multiTenant[tenantIndex].method;
      console.log(this.data.loginParams.tenantStr)
  },
  getUserName:function(e){
    this.setData({
      userName:e.detail.value
    })
    this.data.loginParams.name = e.detail.value;
    console.log("名字："+this.data.userName);
    this.checkLogin();
  },
  getPassword:function(e){
    this.setData({
      password:e.detail.value
    })
    let pass;
    if(e.detail.value == ""){
      pass = "";
    }else{
      pass = md5.hexMD5(e.detail.value);
    }
    this.data.loginParams.pass = pass;
    console.log("密码："+this.data.loginParams.pass);
    this.checkLogin();
  },
  getCheckCode:function(e){
    let checkCode;
    if(e.detail.value == ""){
      checkCode = "";
    }else{
      checkCode = e.detail.value;
    }
    this.data.loginParams.checkCode = checkCode;
    this.checkLogin();
  },
  loginInit:function(fresh){
    let that = this;
    // console.log("login-------start");
    wx.showLoading();
    //调验证码接口
    wx.request({
      url: `${api.checkCodeApi}?${Math.random()}`,
      method:'get',
      data:{},
      success:res => {
        wx.stopPullDownRefresh();//下拉刷新回去
        if(app.globalData.loginFirst){
          // console.log('2222')
          wx.setStorageSync("sessionId", res.header["Set-Cookie"]);//用户登录状态需要传给第三个请求头(自定义状态)
          let logindata = app.globalData.loginFirst;
          
          that.data.loginParams={
            weChat: true,//固定
            tenant: "airport",//固定
            roleType: "2",//固定2表示学生
            st : logindata.st,//从第一个接口获得
            checkType:logindata.checkType,//第一次接口获得(后端判断用户密码参数，前端不用管)
            needCheckCode:0//验证码先不要（?）
            // method: "client"//第一次接口获得 code = 0,有method,code=1,从miniTenant获得，code=-1,登录接口失败
            // tenantStr: "lzuexam",//跟method一样
            // name: "chenchao123",//code=0不穿
            // pass: "605ce528c19859b1cd19087c9283c252",//code=0不穿
          }
          that.data.loginParams.name = that.data.userName;
          that.data.loginParams.pass = that.data.password?md5.hexMD5(that.data.password):"";
          that.data.loginParams.tenantStr = that.data.tenant;
          //是否扫码进来 是否机构列表中有这个机构
          if (that.data.QRcodeTenant && that.data.tenantItem && that.data.tenantItem.length > 0) {
            that.data.loginParams.tenantStr = that.data.tenantItem[0].tenant
          }
          if(logindata.code == -1){
            wx.showToast({
              title: '抱歉，服务器开小差了~',
              icon: 'none',
              duration: 2000
            })
          }else if(logindata.code == 0){//已经绑定学校

            that.data.loginParams.tenantStr = logindata.tenant;
            that.data.loginParams.method = logindata.method;
            that.loginFunction();
            wx.hideLoading();
          }else if(logindata.code == 1){

            // console.log(app.globalData.loginFirst,'全局')
            //机构列表
            that.setData({
              multiTenant:[{tenant:-1,name:"请选择机构"}].concat(JSON.parse(app.globalData.loginFirst.miniTenant)),
            })
              // console.log(that.data.multiTenant);
            wx.hideLoading();
          }else{
            //do nothing
          }
        }else{
          wx.showToast({
            title: '服务器开小差了~请退出重新进入',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:res => {
        wx.stopPullDownRefresh();//下拉刷新回去
        //是否扫码进来 是否机构列表中有这个机构
        if (that.data.QRcodeTenant && that.data.tenantItem && that.data.tenantItem.length > 0) {
          that.data.loginParams.tenantStr = that.data.tenantItem[0].tenant;
          wx.showToast({
            title: '服务连接失败~请下拉刷新',
            icon: 'none',
            duration: 3000
          })
        }else{
          wx.showToast({
            title: '服务连接失败~请下拉刷新',
            icon: 'none',
            duration: 3000
          })
        }
        
      }
    })
    // console.log("login-------end");
  },
  loginFunction:function(){
    let that = this;
    // let { weChat, tenant, method, iv, encryptedData, confirm, roleType, st, checkType, needCheckCode,tenantStr,name,pass,checkCode } = this.data.loginParams
    wx.request({
      url: `${api.login}`,
      method:'get',
      header: { "cookie": wx.getStorageSync("sessionId")},
      data :  this.data.loginParams,
      success:res => {
        //请求成功
        if (res.data.status === 1) {
          let oResult = res.data.data;

          if(oResult.succeeded == "false" || !oResult.succeeded){
            let sResson = "";
            if(oResult.reason=="checkCodeError"){
							sResson = "验证码错误";
						}else if(oResult.reason=="noUserName"){
							sResson = "用户名不存在";
						}else if(oResult.reason=="needCheckCode"){
              sResson = "需要验证码";
              that.setData({
                showCheckCode:true
              })
              that.data.loginParams.needCheckCode = 1;
						}else if(oResult.reason=="maxFailTime"){
							sResson = "半小时内错误次数超过5次";
						}else if(oResult.reason=="passwordError"){
							sResson = "密码错误";
						}else if(oResult.reason=="userDisenabled"){
							sResson = "用户停用";
						}else if(oResult.reason=="userNorole"){
							sResson = "用户无权限";
						}else if(oResult.reason=="orgDisenabled"){
							sResson = "组织机构已停用";
						}else if(oResult.reason=="binded"){
              wx.showModal({
                title: '提示',
                content: '账户已被其他微信绑定，确定重新绑定？',
                success (res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                    that.data.loginParams.confirm = 1;
                    that.loginFunction();
                  } else if (res.cancel) {
                    // console.log('用户点击取消')
                  }
                }
              })
            }else{

            }
            if(sResson != ""){
              wx.showToast({
                title: sResson,
                icon: 'none',
                duration: 2000
              });
            }
          }else{
            wx.showToast({
              title: '登录成功~',
              icon: 'none',
              duration: 2000
            });
            let params = {};
            request(api.UserFPSettings,'post',params).then(res => {

              if(res){
                app.globalData.userInfo = res;
                console.log(app.globalData.userInfo);
                wx.switchTab({
                  url:'/pages/index/index'
                })
              }
            })
          }

        } else {
          // reject( res.data.error );
          wx.showToast({
            title: '抱歉，服务器开小差了~',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail : err => {
        wx.showToast({
          title: '抱歉，服务器开小差了~',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  loginSubmit:function(){
    //获取手机号
    // this.getPhoneNumber();
    this.loginFunction();
  },
  bindGetUserInfo:function(e){
    // console.log(e.detail.userInfo)
  },
  wexinloginFn:function(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              // that.queryUsreInfo();
              // console.log(res);
              //用户已经授权过
              // wx.navigateTo({
              //   url: '/pages/loginsuccess/loginsuccess',
              // })
            }
          });
        }
      }
    })
  },
  checkLogin:function(){
    let that = this;
    let reason = "";
    if(!that.data.loginParams.tenantStr || that.data.loginParams.tenantStr === -1){
      that.setData({
        showLogin:false
      })
      return reason="请选择机构";
    }
    if(!that.data.loginParams.name){
      that.setData({
        showLogin:false
      })
      return reason="请输入用户名";
    }
    if(!that.data.loginParams.pass){
      that.setData({
        showLogin:false
      })
      return reason="请输入密码";
    }
    if(that.data.showCheckCode){
      if(!that.data.loginParams.checkCode){
        that.setData({
          showLogin:false
        })
        return reason="请输入验证码";
      }
    }
    if(reason == ""){
      that.setData({
        showLogin:true
      })
    }
    return reason;
    // && that.data.loginParams.method && that.data.loginParams.name && that.data.loginParams.pass)
  },
  checkLoginFn:function(){
    let that = this;
    let checkStr = that.checkLogin();
    if(checkStr != ""){
      wx.showToast({
        title: checkStr,
        icon:'none',
        duration:2000
      })
      return false;
    }else{
      return true;
    }
  },
  roadCheckCode:function(){
    // this.setData({
    //   checkNode:`${api.checkCodeApi}?${Math.random()}`
    // })
    wx.request({
      url: `${api.checkCodeApi}?${Math.random()}`,
      method:'get',
      header: { "cookie": wx.getStorageSync("sessionId")},
      responseType: 'arraybuffer',
      dataType : 'other',
      success:res => {
        console.log(res);
        // this.setData({
        //   checkNode:res.data
        // })
        let base64 = wx.arrayBufferToBase64(res.data);
        console.log(base64);
        this.setData({
          checkNode: "data:image/PNG;base64," + base64
        })
      },
      fail : err => {
        wx.showToast({
          title: '获取验证码失败~',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  clearFn:function(){
    this.setData({
      userName:""
    })
  }
})
