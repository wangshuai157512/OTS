const app = getApp()
const wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      questionList : {
        type : Array
      },
      isShow : {
        type : Boolean,
        default : false
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      hideAnswerCard () {
        this.triggerEvent('hideAnswerCard')
      },
      goCurrentQuestion (e) {
          let currentpage = wechat.getElementData(e,'currentpage')
          this.triggerEvent('goCurrentPage', { currentPage : currentpage})
      },
      submitPaper () {
          this.triggerEvent('submitPaper')
      }
  }
})
