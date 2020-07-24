const app = getApp()
const wechat = app.globalData.wechat

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      defaultValue : {
          type : Array,
          value : []
      },
      areaList : {
          type : Array,
          observer (value) {
            let defaultValue = this.properties.defaultValue
            value.forEach((item,index) => {
              if (defaultValue) {
                let AreaItem = defaultValue.filter(defaultItem => defaultItem.id === item.id)
                if (AreaItem.length > 0) {
                    item.content = AreaItem[0].content
                }
              }
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
      }
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
      change (e) {
        let { value } = e.detail
        let index = wechat.getElementData(e,'index')
        let areaList = this.data.areaNewList
        let optionIDs = []
        this.replaceDataOnPath(['areaNewList', index, 'content'], value);

        this.applyDataUpdates();

        areaList.forEach((item) => {
            if (item.content) {
                optionIDs.push({
                    id : item.id,
                    content : item.content
                })
            }
        })

        const { packIndex,questionIndex,subQuestionIndex } = this.properties
        this.triggerEvent('chosen' , {
            optionIDs,
            packIndex,
            questionIndex,
            subQuestionIndex
        })
      }
  }
})
