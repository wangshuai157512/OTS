// components/judgementCorrection/judgementCorrection.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      options : {
          type : Array
      },
      defaultValue : {
          type : Object,
          value : {},
          observer (val) {
              if (val) {
                  let options = this.properties.options.filter(item => item.id === val.id)
                  if (options.length > 0) {
                      if (options[0].content === '错' || options[0].content === 'F') {
                          this.setData({
                              isShowInput : true
                          })
                      }
                  }
                  this.setData({
                      optionID : {
                          id : val.id,
                          content : val.content,
                          optionContent : options[0].content
                      }
                  })
              }
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
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowInput : false,
    content : '',
    params : null,
    optionID : {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
      change (e) {
        let val = e.detail.value
        let data = this.data.params

        this.setData({
            content : val
        })

        if (data) {
            data.content = val
        }  else {
            data = {
                content : val,
                optionID : this.data.optionID.id,
                optionContent : this.data.optionID.optionContent,
                packIndex : this.properties.packIndex,
                questionIndex : this.properties.questionIndex,
                subQuestionIndex : this.properties.subQuestionIndex
            }
        }

        this.triggerEvent('chosen',data)

      },
      onJudgeChosen (e) {
        const detail = e.detail

        if (detail.optionContent === '对' || detail.optionContent === 'T') {
          this.setData({
              isShowInput : false,
              content : ''
          })
        } else {
            this.setData({
                isShowInput : true
            })
        }

        this.setData({
            params : detail
        })

        const data = {
            ...detail,
            content : this.data.content
        }

        this.triggerEvent('chosen',data)

      }
  }
})
