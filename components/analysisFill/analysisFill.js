const app = getApp()
const wechat = app.globalData.wechat

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    areaList : {
        type : Array,
        observer (value) {
          value.forEach((item,index) => {
            item.order = index + 1
          })

          this.setData({
              areaNewList : value
          })
        }
    },
    packIndex : {
        type : Number
    },
    questionIndex : {
        type : Number
    },
    subQuestionIndex : {
        type : Number
    },
    defaultValue : {
      type : Array
    },
    studentValue : {
      type : Array,
    },
    answerCorrect : {
      type : Boolean,
    },
      // 解析部分
    analysis: {
        type : String
      },
      difficulty: {
        type : String
      },
      category: {
        type : String
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
      areaNewList : []
  },
  /**
   * 组件的方法列表
   */
  methods: {
      
  }
})
