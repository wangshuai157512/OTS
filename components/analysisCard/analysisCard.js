const app = getApp()
const wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      questionList : {
        type : Array,
        observer (val) {
          val.forEach((packItem) => {
            packItem.questions.forEach((item)=> {
              if (item.answerStatus === 0) {
                  item.answerCardState = 'right'
              }   else if (item.answerStatus === 1) {
                  item.answerCardState = 'right'
              } else if (item.answerStatus === 2) {
                  if (item.answerContent === null) {
                      item.answerCardState = 'default'
                  } else {
                      item.answerCardState = 'error'
                  }
              }
              this.setData({
                  optionList: val
              });
            })
            
            
          });
        }
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
    optionList: []
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
