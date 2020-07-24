const app = getApp()

import tools from '../../utils/util'

import eventBus from '../../utils/eventsBus'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      timeLimitEnabled : {
          type : Boolean
      },
      useTime : {
          type : Number,
      },
      autoPhotoTimes : {
          type : String
      },
      minimumCommitTime : {
          type : Number
      },
      takePhotoInMinimumCommitTime : {
          type : Number
      },
      photoInPocessTest : {
          type : Number
      },
      paperTime : {
          type : Number,
          observer (val) {
              let useTime = this.properties.useTime

              let time = (val * 60) - useTime

              this.setData({
                  paperDateTime : time,
                  paperDate : val
              })

              app.globalData.paperDateTime = useTime

              this.setTime()

          }
      },
      analysisState : {
          type : Boolean,
          value : false
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      paperDate : 0,
      paperDateTime : 0,
      dateTime : '00:00',
      randomList : [],
      isShowSaveBtn : true
  },
  ready() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
      nextQuestion () {
        this.triggerEvent('nextQuestion')
      },
      prevQuestion () {
          this.triggerEvent('prevQuestion')
      },
      showAnswerCard () {
          this.triggerEvent('showAnswerCard')
      },
      setTime () {
          let _this = this
          let timeLimitEnabled = this.properties.timeLimitEnabled
          if (this.data.paperDate > 0 && timeLimitEnabled) {
              if (this.paperTimer) {
                  this.clearTimer()
              }
              this.paperTimer = setInterval(() => {

                  if (this.data.paperDateTime < 0) {
                      app.globalData.isTimeOut = true
                      _this.clearTimer()
                      _this.triggerEvent('submitPaper')
                      return
                  }

                  let dateTime = tools.paperTime(this.data.paperDateTime)

                  let paperDateTime = this.data.paperDateTime - 1

                  app.globalData.paperDateTime = (this.properties.paperTime * 60) - paperDateTime

                  this.setData({
                      dateTime,
                      paperDateTime,
                      isShowSaveBtn : false
                  })

              },1000)
          }
      },
      clearTimer () {
          clearInterval(this.paperTimer)
      },
      savePaper () {
          this.triggerEvent('savePaper')
      }
  }
})

//minimumCommitTime 最短提交时间
//takePhotoInMinimumCommitTime 最短时间内拍照的次数
//autoPhotoTimes 拍照次数
//paperTime 考试时长
//photoInPocessTest 已经拍照次数
// paperTime - useTime 当前时间


//指定范围 不重复 指定间隔 指定个数
