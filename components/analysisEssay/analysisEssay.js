const app = getApp()
const wechat = app.globalData.wechat

import api from '../../utils/api'
import request from '../../utils/request'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    type : String
    },
    studentValue : {
    type : String,
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
     
  },
  /**
   * 组件的方法列表
   */
  methods: {
      
  }
})
