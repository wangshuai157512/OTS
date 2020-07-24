let app = getApp()
let wechat = app.globalData.wechat
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      defaultValue : {
          type : String,
          value : ''
      },
      options : {
        type : Array,
        observer (value) {
            let defaultValue = this.properties.defaultValue
            const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
            value.forEach((item, i) => {
                // item.content = item.content
                item.order = alphabet[i];
                item.state = 'default';
                if (defaultValue === item.id) {
                    item.state = 'chosen'
                    item.chosen = true
                    this.chosenIndex = i
                }
            });
            this.setData({
                optionList: value
            });
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
      optionList : []
  },

  /**
   * 组件的方法列表
   */
  methods: {
      cleanHTMLTags(s) {
          return s.replace(/<[^>]+>/g, '');
      },
      onChosen (event) {
          const properties = this.properties;
          const index= wechat.getElementData(event,'index')
          const options = this.data.optionList;
          const chosenIndex = this.chosenIndex;
          if (index !== chosenIndex) {

              this.replaceDataOnPath(['optionList', index, 'chosen'], true);
              this.replaceDataOnPath(['optionList', index, 'state'], 'chosen');

              if (typeof chosenIndex !== 'undefined') {
                  this.replaceDataOnPath(['optionList', chosenIndex, 'chosen'], false);
                  this.replaceDataOnPath(['optionList', chosenIndex, 'state'], 'default');
              }
              this.applyDataUpdates();

              this.chosenIndex = index;
          }
          this.triggerEvent('chosen', {
              optionID : options[index].id,
              packIndex : properties.packIndex,
              questionIndex: properties.questionIndex,
              subQuestionIndex: properties.subQuestionIndex
          })
      }
  }
})
