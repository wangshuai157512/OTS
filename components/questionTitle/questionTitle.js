
const app = getApp()
const wechat = app.globalData.wechat

import tools from '../../utils/util'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title : {
      type : String
    },
    analysisState : {
      type : Boolean
    },
    questionId : {
        type : String
    },
    src : {
        type : String,
        observer (val) {
            this.setData({
                audioSrc : val
            })
            this.createAudio()
        }
    },
    isShowScore : {
        type : Boolean
    },
    score : {
        type : [String,Number]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      audioSrc : '',
      duration : 0,
      currentTime : 0,
      showTime : '00:00',
      isPlay : false
  },

    detached () {
        this.destroy()
    },
  /**
   * 组件的方法列表
   */
  methods: {

      /**
       * 创建audio
       */
      createAudio () {

          let _this = this

          this.innerAudioContext = wx.createInnerAudioContext();
          this.innerAudioContext.src = this.data.audioSrc
          // this.innerAudioContext.src = 'http://mp32.9ku.com/upload/128/2018/03/10/876640.mp3'

          app.globalData.audioExa.push({
              audioItem : this.innerAudioContext,
              questionId : this.data.questionId
          })
          /**
           * 监听播放失败事件
           */
          this.innerAudioContext.onError((res) => {
              console.log(res)
              // 播放音频失败的回调
              wechat.showToast('音频加载失败')

                this.setData({ isPlay : false })

            })


          /**
           * 播放暂停事件
           */
            this.innerAudioContext.onPause(() => {
                this.setData({ isPlay : false })
            })

          /**
           * 监听播放进度事件
           */
          this.innerAudioContext.onTimeUpdate(() => {

              if (!_this.data.duration) {
                  _this.setData({
                      duration : parseInt(_this.innerAudioContext.duration),
                  })
              }

              let currentTime = parseInt(this.innerAudioContext.currentTime)

              let showTime = tools.paperTime(currentTime)

              this.setData({ showTime, currentTime })
          })

          /**
           *
           * 监听播放事件
           */
          this.innerAudioContext.onPlay(() => {
               this.setData({ isPlay : true })
          })

          /**
           *  监听播放完毕事件
           */
          this.innerAudioContext.onEnded(() => {
              this.setData({ isPlay : false })
          })

      },

      /**
       * 播放
       */
      play () {
          let noCurrentAudio = app.globalData.audioExa.filter(item => item.questionId !== this.data.questionId && !item.audioItem.paused)
          for (let i = 0; i < noCurrentAudio.length; i++) {
              let current = noCurrentAudio[i].audioItem
              current.pause()
          }
          this.innerAudioContext.play()
      },

      /**
       *  暂停
       */
      pause () {
          this.innerAudioContext.pause()
      },

      /**
       * 跳转
       */
      seek (event) {
          let type = wechat.getElementData(event,'seektype')
          let currentTime = this.data.currentTime
          if (type == 1) {
              currentTime -= 5
          } else {
              currentTime += 5
          }
          this.innerAudioContext.seek(currentTime)
      },

      /**
       * 销毁实例
       */
      destroy () {
          if (this.innerAudioContext) {
              this.innerAudioContext.destroy()
          }
      }
  }
})
