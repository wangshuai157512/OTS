let app = getApp()
let wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      // 试题部分
    options : {
      type : Array,
    },
    packIndex: {
      type : Number
    },
    questionIndex : {
      type : Number
    },
    subQuestionIndex : {
      type : Number
    },
    defaultValue : {
        type : String
    },
    studentValue : {
      type : String,
    },
    studentContent : {
      type : String,
    },
    answerStatus : {
      type : Number,
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
      optionList : [],
      answer: ['','正确', '错误']
  },
  
  ready () {
      let {options , answerCorrect ,studentValue,defaultValue,answerStatus } = this.properties
      console.log(defaultValue)
      console.log(options)
      const alphabet = ['../../static/img/judge-y-0.png', '../../static/img/judge-n-0.png', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
      options.forEach((item,index) => {
        item.content = this.cleanHTMLTags(item.content)
        item.order = alphabet[index]
        if (answerStatus === 0 || answerStatus === 1) {
          if (defaultValue === item.id) {
                item.state = 1
          }else {
            if (studentValue === item.id) {
                 item.state = 2 
            }
          }
        } else if(answerStatus === 2) {
          
            if (defaultValue === item.id) {
              item.state = 1
            }else {
              if (studentValue === item.id) {
                   item.state = 2 
              }
            }
             
        }
        // if (answerCorrect) {
        //   if (defaultValue === item.id) {
        //     item.state = 1
        //   }
        // } else {
        //   if (defaultValue === item.id) {
        //     item.state = 1
        //  }
        //  if (studentValue === item.id) {
        //    item.state = 2 
        //  }
        // }
      })
      this.setData({
        optionList : options
      })
    },
  /**
   * 组件的方法列表
   */
  
  methods: {
      cleanHTMLTags(s) {
          return s.replace(/<[^>]+>/g, '');
      },
      
  }
})
