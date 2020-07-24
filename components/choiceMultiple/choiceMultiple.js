
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
    options : {
        type : Array,
        observer (value) {
            let defaultValue = this.properties.defaultValue
            const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
            value.forEach((item, i) => {
                // item.content = item.content
                item.order = alphabet[i];
                item.state = 'default'
                for (let val of defaultValue) {
                    if (Number(val) === Number(item.id)) {
                        item.chosen = true;
                        item.state = 'chosen'
                        break;
                    }
                }
            });

            this.setData({
                optionList: value
            });
        }
    },
    packIndex: {
        type: Number
    },
    questionIndex: {
        type: Number
    },
    subQuestionIndex: {
        type: Number
    },
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
      cleanHTMLTags (s) {
          return s.replace(/<[^>]+>/g, '');
      },
      onChosen (event) {
          const index = wechat.getElementData(event,'index')
          const options = this.data.options;
          const option = options[index];
          let indexs = [];
          let optionIDs = [];
          if (option.chosen) {
              this.replaceDataOnPath(['optionList', index, 'chosen'], false);
              this.replaceDataOnPath(['optionList', index, 'state'], 'default');
          } else {
              this.replaceDataOnPath(['optionList', index, 'chosen'], true);
              this.replaceDataOnPath(['optionList', index, 'state'], 'chosen');
          }

          this.applyDataUpdates();

          options.forEach((item, i) => {
              if (item.chosen) {
                  indexs.push(i);
                  optionIDs.push(item.id);
              }
          });

          const properties = this.properties;

          this.triggerEvent('chosen' , {
              indexs,
              optionIDs,
              packIndex: properties.packIndex,
              questionIndex: properties.questionIndex,
              subQuestionIndex:properties.subQuestionIndex
          })

      }
  }
})
