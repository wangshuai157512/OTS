const app = getApp()
const wechat = app.globalData.wechat

import api from '../../utils/api'
import request from '../../utils/request'
import upload from '../../utils/upload'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      defaultValue : {
          type : String,
          value : ''
      },
      packIndex : {
          type : Number
      },
      questionIndex : {
          type : Number
      },
      subQuestionIndex : {
          type : Number
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      imgList : [],
      canIUse: wx.canIUse('editor'),
      isRead : true
  },
  /**
   * 组件的方法列表
   */
  methods: {
      /**
       * 设置富文本默认内容
       */
      setContent () {
          let context,defaultValue = this.properties.defaultValue,_this = this
          wx.createSelectorQuery().in(this).select('#editor').context(function (res) {
              context = res.context
              if (defaultValue && defaultValue !== '<p><br></p>') {
                  context.setContents({
                      html : defaultValue
                  })
              }
              _this.setData({
                  isRead : false
              })
          }).exec()

      },
      uploadImg () {
          let context;
          wx.createSelectorQuery().in(this).select('#editor').context(function (res) {
              context = res.context
          }).exec()
          upload.uploadImg(['camera']).then(res => {
              let { imgBase , imgType } = res
              let params = {
                  imageStr : imgBase,
                  extName : imgType
              }
              request(api.UploadImageByClient,'post',params).then(res => {
                  let imgPath = res.filePathUploaded
                  context.insertImage({
                      src: imgPath,
                      width: '100%',
                      success: function () { },
                      fail : () => {
                          wechat.showToast('插入失败')
                      },
                      complete : () => {
                          wx.hideLoading()
                      }
                  })
              }).catch(err => {
                  console.log(err)
                  wx.hideLoading()
                  wechat.showToast('上传失败')
              })
          })
          .catch(err => {
             wx.hideLoading()
             // wechat.showToast(err.msg)
          })
      },

      delImg (e) {
          let dataIndex = wechat.getElementData(e,'index')
          let imgList = this.data.imgList.filter((item,index) => index !== dataIndex)
          this.setData({ imgList })
      },

      onChange (e) {
          let { html } = e.detail
          const  properties = this.properties
          this.triggerEvent('chosen' , {
              html,
              packIndex : properties.packIndex,
              questionIndex: properties.questionIndex,
              subQuestionIndex : properties.subQuestionIndex
          })
      }
  }
})
