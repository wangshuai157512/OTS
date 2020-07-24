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
              const bgcList = [
                  {
                    img_n : '../../static/img/judge-y-0.png',
                    img_s : '../../static/img/judge-y-1.png'
                  },
                  {
                    img_n : '../../static/img/judge-n-0.png',
                    img_s : '../../static/img/judge-n-1.png'
                  }
              ];
              value.forEach((item, i) => {
                  item.content = this.cleanHTMLTags(item.content);
                  if (item.content == '对' || item.content == 'T') {
                      item.imgContent = bgcList[0]
                  } else if (item.content == '错' || item.content == 'F') {
                      item.imgContent = bgcList[1]
                  }
                  item.state = 'default';
                  if (item.id === defaultValue) {
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
          const properties = this.properties;
          this.triggerEvent('chosen', {
              optionID : options[index].id,
              packIndex : properties.packIndex,
              questionIndex: properties.questionIndex,
              subQuestionIndex: properties.subQuestionIndex,
              optionContent : options[index].content
          })
      }
  }
})
