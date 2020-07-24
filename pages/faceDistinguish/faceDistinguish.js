const app = getApp()
const wechat = app.globalData.wechat

import upload from '../../utils/upload'

import request from '../../utils/request'
import api from '../../utils/api'

import paper from '../../utils/paper'

let userFaceImageUrl = null,type = 1,answerPaperId = null,id = null, autoPhotoTimes = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query : null
  },

  startFaceContrast () {
      wechat.showLoading()
      let _this = this
      let data = { arrangementId : this.data.query.id }
      
      request(api.StartAnswerPaperWithPhotoByMini,'post',data).then(res => {
          wx.hideLoading()
          let answerData = paper.isAnswerPaperState(res.answerPaperFlag)
          if (answerData.isAnswer) {
                let  userFaceImageUrl = res.userFaceImageUrl,
                  answerPaperId = res.answerPaperRecordId,
                  id = res.arrangementId
              if (res.photoBeginAboveThreeTimes) {
                  if(res.comparefailClose){
                    wechat.showToast('考生验证不通过不能进入考试！')
                    return
                  }else{
                    wx.showModal({
                        title : '提示',
                        content : '您的人脸识别验证未通过，将在人工审核后确定本次考试成绩是否有效！',
                        cancelText : '再次验证',
                        confirmText : '是我本人',
                        success : res => {
                            if (res.confirm) {
                                let resetParams = {
                                    arrangementId : id,
                                    answerPaperId,
                                    type,
                                    agreeByUser: true
                                }
                                request(api.ResetAnswerPaperStartTime,'post',resetParams).then(res => {
                                    // console.log(res)
                                    if(res) {
                                        // wechat.showToast('验证通过',true)
                                        wechat.showLoading()
                                        setTimeout(() => {
                                            wx.hideLoading()
                                            wx.navigateTo({
                                                url: `/pages/examinationItem/examinationItem?id=${id}&isFace=${true}&type=${type}&answerPaperId=${answerPaperId}&basePhoto=${userFaceImageUrl}&autoPhotoTimes=${autoPhotoTimes}`
                                            })
                                        },4000)
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    wx.hideLoading()
                                    wechat.showToast('重置作答时间失败')
                                })
                            } else if (res.cancel) {
                                _this.contrast({ userFaceImageUrl,type, answerPaperId,id})
                            }
                        }
                    })
                  }
              } else {
                  if (res.takePhotoInTest && res.photoBeginTest) {
                      this.contrast({ userFaceImageUrl,type, answerPaperId,id})
                  } else {
                      autoPhotoTimes = parseInt(res.autoPhotoTimes - res.photoInPocessTest)
                      wechat.showLoading()
                      // wechat.showToast('验证通过',true)
                      setTimeout(() => {
                          wx.hideLoading()
                          wx.navigateTo({
                              url: `/pages/examinationItem/examinationItem?id=${id}&isFace=${true}&type=${type}&answerPaperId=${answerPaperId}&basePhoto=${userFaceImageUrl}&autoPhotoTimes=${autoPhotoTimes}`
                          })
                      },4000)
                  }

              }
          } else {
              wechat.showToast(answerData.msg)
          }
      })
      .catch(err => {
          wechat.showToast(err)
      })
  },

  contrast ({ userFaceImageUrl,type,answerPaperId,id }) {
      let _this = this

      upload.uploadImg(['camera']).then(res => {
          let { imgBase , imgType } = res
          let params = {
              arrangementId : id,
              imageStr : imgBase,
              extName : imgType,
              type,
              answerPaperId,
              basePhoto : userFaceImageUrl
          }
          request(api.faceCompare,'post',params).then(res => {
              autoPhotoTimes = parseInt(res.autoPhotoTimes - res.photoInPocessTest)
              if (res.photoBeginAboveThreeTimes) {
                  wx.showModal({
                      title : '提示',
                      content : '您的人脸识别验证未通过，将在人工审核后确定本次考试成绩是否有效！',
                      cancelText : '再次验证',
                      confirmText : '是我本人',
                      success : res => {
                          if (res.confirm) {
                              let resetParams = {
                                  arrangementId : id,
                                  answerPaperId,
                                  type,
                                  agreeByUser: true
                              }
                              request(api.ResetAnswerPaperStartTime,'post',resetParams).then(res => {
                                  if(res) {
                                      wx.navigateTo({
                                          url: `/pages/examinationItem/examinationItem?id=${id}&isFace=${true}&type=${type}&answerPaperId=${answerPaperId}&basePhoto=${userFaceImageUrl}&autoPhotoTimes=${autoPhotoTimes}`
                                      })
                                  }
                              }).catch(err => {
                                  console.log(err)
                                  wx.hideLoading()
                                  wechat.showToast('重置作答时间失败')
                              })
                          } else if(res.cancel) {
                              _this.contrast({ userFaceImageUrl,type, answerPaperId,id})
                          }
                      }
                  })
              } else if (res.photoBeginTest) {
                  wx.showModal({
                      title : '提示',
                      content : '您的人脸识别验证未通过',
                      cancelText : '取消',
                      confirmText : '再次验证',
                      success : res => {
                          if (res.confirm) {
                              _this.contrast({ userFaceImageUrl,type, answerPaperId,id})
                          }
                      }
                  })
              } else {
                  wechat.showToast('验证通过',true)
                  setTimeout(() => {
                      wx.navigateTo({
                          url: `/pages/examinationItem/examinationItem?id=${id}&isFace=${true}&type=${type}&answerPaperId=${answerPaperId}&basePhoto=${userFaceImageUrl}&autoPhotoTimes=${autoPhotoTimes}`
                      })
                  },4000)
              }
              wx.hideLoading()
          })
              .catch(err => {
                  wx.hideLoading()
                  wechat.showToast('上传失败')
              })
      })

      // upload.uploadImg(['camera']).then(res => {
      //     let { imgBase , imgType } = res
      //     let params = {
      //       arrangementId : id,
      //       imageStr : imgBase,
      //       extName : imgType,
      //       type,
      //       answerPaperId,
      //       basePhoto : userFaceImageUrl
      //     }
      //     request(api.faceCompare,'post',params).then(res => {
      //       autoPhotoTimes = parseInt(res.autoPhotoTimes - res.photoInPocessTest)
      //       if(!res.photoBeginAboveThreeTimes && res.photoBeginTest) {
      //         wx.showModal({
      //             title : '提示',
      //             content : '您的人脸识别验证未通过',
      //             cancelText : '取消',
      //             confirmText : '再次验证',
      //             success : res => {
      //               if (res.confirm) {
      //                 _this.contrast({ userFaceImageUrl,type, answerPaperId,id})
      //               }
      //             }
      //         })
      //       }else if (res.photoBeginAboveThreeTimes && res.photoBeginTest) {
      //         wx.showModal({
      //             title : '提示',
      //             content : '您的人脸识别验证未通过，将在人工审核后确定本次考试成绩是否有效！',
      //             cancelText : '再次验证',
      //             confirmText : '是我本人',
      //             success : res => {
      //               if (res.confirm) {
      //                 let resetParams = {
      //                   arrangementId : id,
      //                   answerPaperId,
      //                   type,
      //                   agreeByUser: true
      //                 }
      //                 request(api.ResetAnswerPaperStartTime,'post',resetParams).then(res => {
      //                   // console.log(res)
      //                   if(res) {
      //                     wx.navigateTo({
      //                       url: `/pages/examinationItem/examinationItem?id=${id}&isFace=${true}&type=${type}&answerPaperId=${answerPaperId}&basePhoto=${userFaceImageUrl}&autoPhotoTimes=${autoPhotoTimes}`
      //                     })
      //                   }
      //                 }).catch(err => {
      //                   console.log(err)
      //                   wx.hideLoading()
      //                   wechat.showToast('重置作答时间失败')
      //                 })
      //               }
      //             }
      //         })
      //       } else if(!res.photoBeginAboveThreeTimes && !res.photoBeginTest){
      //           wechat.showToast('验证通过',true)
      //           setTimeout(() => {
      //               wx.navigateTo({
      //                   url: `/pages/examinationItem/examinationItem?id=${id}&isFace=${true}&type=${type}&answerPaperId=${answerPaperId}&basePhoto=${userFaceImageUrl}&autoPhotoTimes=${autoPhotoTimes}`
      //               })
      //           },2000)
      //       }
      //       wx.hideLoading()
      //     })
      //     .catch(err => {
      //         wx.hideLoading()
      //         wechat.showToast('上传失败')
      //     })
      //  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          query : options
      })
  },
})
