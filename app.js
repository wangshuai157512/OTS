import login from './utils/login'
import api from './utils/api'
import wechat from './utils/wechat.js'
import request from './utils/request.js'
App({
    onLaunch: function () {
      // let sceneData = wx.getLaunchOptionsSync()
      // let scene = sceneData.scene
      // console.log(sceneData.scene)
      // if (scene === 1047 || scene === 1048 || scene === 1049 || scene === 1089) {
      //   let params = decodeURIComponent(sceneData.query.scene)
      //   this.globalData.tenant = params.split('=')[1]
      //   // this.globalData.tenant = '2222'
      //   console.log(this.globalData.tenant)
      // }
        if (wx.getUpdateManager) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {})

            updateManager.onUpdateReady(function () {
                wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success(res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate()
                        }
                    }
                })
            })

            updateManager.onUpdateFailed(function () {
                // 新版本下载失败
            })
        } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用自动更新版本功能，请升级到最新微信版本或手动更新。'
            })
        }

    //用户登录
    login.getCode()
    .then(code => {
      let params = {
        js_code: code,
        grant_type: 'authorization_code',
        tenant:"airport",
        weChat:true
      };
      let st,checkType;
      request(`${api.login}?js_code=${code}&grant_type=authorization_code&tenant=airport&weChat=${true}`,'get').then(res => {
        // console.log(res);
        if(res){
          this.globalData.loginFirst = res;
          //获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: res => {
                    this.globalData.userInfo = res.userInfo
                    wx.redirectTo({
                      url: '/pages/loginhome/loginhome',
                    })
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                  }
                })
              }
            }
          })
        }
      })
    });
  },
  globalData:{
      userInfo: null,
      loginFirst:{},
      miniTenant:[],
      submitPaperData : null,
      api,
      wechat,
      viewActivityTypeIds:[],
      isTimeOut : false,
      audioExa : [],
      showSchool:true,//控制是否让选择机构列表
      //当前考试时长
      paperDateTime : 0,
      //从二维码上带的机构
      tenant : null
  }
})

