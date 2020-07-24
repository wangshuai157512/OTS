let app = getApp()
let wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      // 试题部分
    defaultValue : {
      type : Array
    },
    studentValue : {
      type : Array,
    },
    options : {
      type : Array,
      observer(val) {
        let studentValue =this.properties.studentValue
        let defaultValue =this.properties.defaultValue
        let student = '',right = ''
        val.forEach((item,index)=> {
          studentValue.forEach((studentItem)=> {
            if(item.id === studentItem) {
              student+= this.data.answer[index]
            }
          })
          defaultValue.forEach((defaultItem)=> {
            if(item.id === defaultItem) {
              right+= this.data.answer[index]
            }
          })
        })
        this.setData({
          studentState : student,
          defaultState : right
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
      answer: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      studentState : '',
      defaultState : ''

  },
  ready () {
      let {options,studentValue,defaultValue} = this.properties
      const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
      options.forEach((item,index) => {
        item.content = this.cleanHTMLTags(item.content)
        item.order = alphabet[index]
          defaultValue.forEach((itemValue)=> {
            if (itemValue === item.id) {
              item.state = 1
            }
          })
          if(studentValue) {
            studentValue.forEach((itemStudent)=> {
              if (defaultValue.indexOf(itemStudent) === -1 && itemStudent === item.id) {
                item.state = 2
              }
            })
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
