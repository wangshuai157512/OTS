let app = getApp()
let wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      // 试题部分
    studentValue : {
      type : String,
    },
    defaultValue : {
      type : String
    },
    options : {
      type : Array,
      observer(val) {
        let studentValue =this.properties.studentValue
        let defaultValue =this.properties.defaultValue
        val.forEach((item,index)=> {
          if(item.id === studentValue) {
            this.setData({
              studentState : this.data.answer[index]
            })
          }
          if(item.id === defaultValue) {
            this.setData({
              defaultState : this.data.answer[index]
            })
          }
        })
      }
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
      answer: ['正确', '错误'],
      studentState: '',
      defaultState: '',
  },
  
  ready () {
      let {options,studentValue,defaultValue} = this.properties
      const alphabet = ['../../static/img/judge-y-0.png', '../../static/img/judge-n-0.png', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
      options.forEach((item,index) => {
        item.content = this.cleanHTMLTags(item.content)
        item.order = alphabet[index]
          if (defaultValue === item.id) {
                item.state = 1
          }else if (studentValue === item.id){
                item.state = 2 
          }
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
