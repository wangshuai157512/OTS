let app = getApp()
let wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      // 试题部分
    defaultValue : {
      type : Object
    },
    studentValue : {
      type : Object,
    },
    options : {
      type : Array,
      observer(val) {
        let studentValue =this.properties.studentValue
        let defaultValue =this.properties.defaultValue
        val.forEach((item,index)=> {
          if(studentValue) {
            if(item.id === studentValue.id) {
              this.setData({
                studentState : this.data.answer[index]
              })
            }
          }
          if(defaultValue) {
            if(item.id === defaultValue.id) {
              this.setData({
                defaultState : this.data.answer[index]
              })
            }
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
      score: {
        type : Number
      }
      
      
  },

  /**
   * 组件的初始数据
   */
  data: {
      optionList : [],
      answer: ['正确', '错误'],
      studentState: '',
      defaultState: ''
  },
  
  ready () {
      let {options,studentValue,defaultValue} = this.properties
      const alphabet = ['../../static/img/judge-y-0.png', '../../static/img/judge-n-0.png', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
      options.forEach((item,index) => {
        item.content = this.cleanHTMLTags(item.content)
        item.order = alphabet[index]
        if(defaultValue) {
          if (defaultValue.id === item.id) {
                item.state = 1
          }
        }
          
        if(studentValue) {
          if(studentValue.id === item.id){
              item.state = 2 
          }
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
