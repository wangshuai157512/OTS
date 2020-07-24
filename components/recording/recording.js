const app = getApp()
const wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      isSpeak : false,
      recordingFile : null,
      isSend : true
  },

  /**
   * 组件的声明周期
   */
  lifetimes : {
      ready() {
          let _this = this
          this.recorderManager = wx.getRecorderManager()
      },
  },

  /**
   * 组件的方法列表
   */
  methods: {
      handleLongPress (e) {
          let _this = this
          wx.getSetting({
              success : res => {
                  if (!res.authSetting['scope.record']) {
                      this.setData({
                          isSpeak : false
                      })
                      wx.authorize({
                          scope: 'scope.record',
                          success : () => {
                              wechat.showToast('授权成功')
                          },
                          fail : () => {
                              wx.showModal({
                                  title: '提示',
                                  content: '您未授权录音，功能将无法使用',
                                  showCancel: true,
                                  confirmText: "授权",
                                  confirmColor: "#1966FF",
                                  success: res => {
                                      if (res.confirm) {
                                        //确认则打开设置页面（重点）
                                          wx.openSetting({
                                              success: res => {
                                                  if (!res.authSetting['scope.record']) {
                                                    //未设置录音授权
                                                      wx.showModal({
                                                          title: '提示',
                                                          content: '您未授权录音，功能将无法使用',
                                                          showCancel: false,
                                                          success: function(res) {},
                                                      })
                                                  } else {
                                                    //第二次才成功授权
                                                    wechat.showToast('授权成功')
                                                  }
                                              },
                                              fail: function() {
                                                  wechat.showToast('授权失败')
                                              }
                                          })
                                      } else if (res.cancel) {
                                        console.log("cancel");
                                      }
                                  },
                                  fail: function() {
                                      console.log("openfail");
                                  }
                              })
                          }
                      })
                  }else {
                      _this.recorderManager.onStop(res => {
                          if (_this.data.isSend) {
                              res.time = parseInt(res.duration/1000)
                              _this.setData({
                                  recordingFile : res
                              })
                          }
                          wx.hideToast()
                      })
                      _this.startPoint = e.touches[0];
                      _this.setData({
                          isSpeak : true,
                          isSend : true
                      })
                      _this.recorderManager.start({
                          format : 'mp3'
                      })
                  }
              }
          })
          // this.recorderManager.start()
      },
      handleTouchEnd () {
          this.recorderManager.stop()
          this.setData({
              isSpeak : false
          })
      },
      handleMove (e) {
          try {
              let moveLenght = e.touches[e.touches.length - 1].clientY - this.startPoint.clientY;
              if (Math.abs(moveLenght) > 100) {
                  wechat.showToast('取消录音',false,'none',20000000)
                  this.setData({
                      isSend : false
                  })
              }else {
                  wx.hideToast()
                  this.setData({
                      isSend : true
                  })
              }
          }catch (e) {

          }
      },
      delRecord () {
          let _this = this
          wx.showModal({
              title: '提示',
              content: '确定删除该录音吗？',
              showCancel: true,
              confirmText: "确定",
              confirmColor: "#1966FF",
              success : res => {
                if (res.confirm) {
                  _this.setData({
                      recordingFile : null
                  })
                }
              }
          })
      },
      playRecord () {
          let innerAudioContext = wx.createInnerAudioContext();
          innerAudioContext.src = this.data.recordingFile.tempFilePath
          innerAudioContext.onError((res) => {
              // 播放音频失败的回调
              wechat.showToast('播放失败')
          })
          innerAudioContext.play()
      }
  }
})
