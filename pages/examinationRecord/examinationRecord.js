// pages/examinationRecord/examinationRecord.js
import api from '../../utils/api'
import request from '../../utils/request'
import * as echarts from "../../components/ec-canvas/echarts";
const query = wx.createSelectorQuery()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    wrongCurrentTab:0,
    perCurrentTab:0,
    ec:{
      lazyLoad:true
    },
    ecWrong:{
      lazyLoad:true
    },
    ecPer:{
      lazyLoad:true
    },
    countArrangement:0,
    countRecord:0,
    answerNum:[],
    answerDate:[],
    errorDate:[],
    errorNum:[],
    errorTotal:0,
    answerTotal:0,
    errorPer:[],
    answerAve:0,
    errorAve:0,
    answerMaxDate:"",
    errorMaxDate:""
  },
  //  initChart:function() {
  //   let that = this;
  //   let answerNumOption = {
  //     xAxis: {
  //       type: 'category',
  //       axisLabel: {
  //         show: true,
  //          textStyle: {
  //            color: '#6A788E',  //更改坐标轴文字颜色
  //          }
  //       },
  //       axisLine:{
  //         lineStyle:{
  //           color:'#E0E6EE', //更改坐标轴颜色
  //         }
  //       } ,
  //       data: this.data.answerDate
  //   },
  //   yAxis: {
  //       type: 'value',
  //       axisLabel: {
  //         show: true,
  //          textStyle: {
  //            color: '#6A788E',  //更改坐标轴文字颜色
  //          }
  //       },
  //       axisLine:{
  //         lineStyle:{
  //           color:'#E0E6EE',
  //         }
  //       },

  //       splitLine: {
  //         lineStyle: {
  //             color: '#fff'
  //         }
  //     },
  //   },
  //   series: [{
  //       data: this.data.answerNum,
  //       type: 'line',
  //       smooth:true,
  //       showSymbol: false,
  //   }]
  //   };
  //   let wrongNumOption = {
  //     xAxis: {
  //       type: 'category',
  //       axisLabel: {
  //         show: true,
  //          textStyle: {
  //            color: '#6A788E',  //更改坐标轴文字颜色
  //          }
  //       },
  //       axisLine:{
  //         lineStyle:{
  //           color:'#E0E6EE', //更改坐标轴颜色
  //         }
  //       } ,
  //       data: this.data.errorDate
  //   },
  //   yAxis: {
  //       type: 'value',
  //       axisLabel: {
  //         show: true,
  //          textStyle: {
  //            color: '#6A788E',  //更改坐标轴文字颜色
  //          }
  //       },
  //       axisLine:{
  //         lineStyle:{
  //           color:'#E0E6EE',
  //         }
  //       },

  //       splitLine: {
  //         lineStyle: {
  //             color: '#fff'
  //         }
  //     },
  //   },
  //   series: [{
  //       data: this.data.errorNum,
  //       type: 'line',
  //       smooth:true,
  //       showSymbol: false,
  //   }]
  //   };
  //   let wrongPerOption = {
  //     color: ['#1966FF', '#FFBA00'],
  //     tooltip: {
  //         show: false,
  //         trigger: 'none',
  //         triggerOn: 'none',
  //         formatter: ' {c} <hr> {b}',
  //         showContent: false,
  //     },
  //     legend: {
  //         orient: 'horizontal',
  //         left: 'left',
  //         data: ['正确率', '错题率'],
  //         show: false
  //     },
  //     series: [
  //           {
  //              name: '',
  //              type: 'pie',
  //              clickable: false,
  //              hoverAnimation: false,
  //              legendHoverLink: false,
  //              silent: false,
  //              radius: ['35%', '55%'],
  //              label: {
  //                  normal: {
  //                      formatter: '{c|{c}%} \n{hr|}\n {b|{b}}  ',
  //                      padding:[0,-80],
  //                      rich: {
  //                          b: {
  //                            align:"right",
  //                            lineHeight: 32,
  //                            color: "#262F40",
  //                          },
  //                          hr: {
  //                            //borderColor: '#05C985',
  //                            width: '100%',
  //                            borderWidth: 0.5,
  //                            height: 0
  //                          },

  //                          c: {
  //                            lineHeight: 32,
  //                            align:"right",
  //                            color:"#45464D",
  //                          }
  //                      }
  //                  }
  //              },
  //              labelLine: {
  //                  normal: {
  //                      show:true,
  //                      length:15,
  //                      length2:60,
  //                  }
  //              },
  //              data:this.data.errorPer
  //           }
  //     ]
  //   }
  //   let answerNumChart;
  //   let errorNumChart;
  //   let errorPerChart;
  //   this.answerComponent =this.selectComponent("#answerNumChart");
  //   this.errorNumComponent =this.selectComponent("#wrongNumChart");
  //   this.errorPerComponent = this.selectComponent("#wrongPerChart");
  //   this.answerComponent.init((canvas,width,height) => {
  //     answerNumChart = echarts.init(canvas,null,{
  //       width:width,
  //       height:height
  //     })
  //     canvas.setChart(answerNumChart);
  //     answerNumChart.setOption(answerNumOption);
  //   })
  //   this.errorNumComponent.init((canvas,width,height) => {
  //     errorNumChart = echarts.init(canvas,null,{
  //       width:width,
  //       height:height
  //     })
  //     canvas.setChart(errorNumChart);
  //     errorNumChart.setOption(wrongNumOption);
  //   })
  //   this.errorPerComponent.init((canvas,width,height) => {
  //     errorPerChart = echarts.init(canvas,null,{
  //       width:width,
  //       height:height
  //     })
  //     canvas.setChart(errorPerChart);
  //     errorPerChart.setOption(wrongPerOption);
  //   })
  //   return answerNumChart,errorNumChart,errorPerChart;
  // },
  initAnswerChart:function(){
    let that = this;
    let answerNumOption = {
      xAxis: {
        type: 'category',
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        axisLabel: {
          show: true,
           textStyle: {
             color: '#6A788E',  //更改坐标轴文字颜色
           }
        },
        axisLine:{
          lineStyle:{
            color:'#E0E6EE', //更改坐标轴颜色
          }
        } ,
        data: this.data.answerDate
      },

    yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
           textStyle: {
             color: '#6A788E',  //更改坐标轴文字颜色
           }
        },
        axisLine:{
          lineStyle:{
            color:'#E0E6EE',
          }
        },

        splitLine: {
          lineStyle: {
              color: '#fff'
          }
      },
    },
    series: [{
        data: this.data.answerNum,
        type: 'line',
        lineStyle: {
          color: '#1966FF',

        },
        smooth:true,
        showSymbol: false,
    }]
    };
    let answerNumChart;
    this.answerComponent =this.selectComponent("#answerNumChart");
    this.answerComponent.init((canvas,width,height) => {
      answerNumChart = echarts.init(canvas,null,{
        width:width,
        height:height,
      })
      canvas.setChart(answerNumChart);
      answerNumChart.setOption(answerNumOption);
    })
    return answerNumChart
  },
  initErrorChart:function(){
    let that = this;
    let errorNumOption = {
      xAxis: {
        type: 'category',
        axisLabel: {
          show: true,
           textStyle: {
             color: '#6A788E',  //更改坐标轴文字颜色
           }
        },
        axisLine:{
          lineStyle:{
            color:'#E0E6EE', //更改坐标轴颜色
          }
        } ,
        data: this.data.errorDate
    },
    yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
           textStyle: {
             color: '#6A788E',  //更改坐标轴文字颜色
           }
        },
        axisLine:{
          lineStyle:{
            color:'#E0E6EE',
          }
        },

        splitLine: {
          lineStyle: {
              color: '#fff'
          }
      },
    },
    series: [{
        data: this.data.errorNum,
        type: 'line',
        lineStyle:{
          color:"#FF8800",
        },
        smooth:true,
        showSymbol: false,
    }]
    };
    let errorNumChart;
    this.errorComponent =this.selectComponent("#wrongNumChart");
    this.errorComponent.init((canvas,width,height) => {
      errorNumChart = echarts.init(canvas,null,{
        width:width,
        height:height
      })
      canvas.setChart(errorNumChart);
      errorNumChart.setOption(errorNumOption);
    })
    return errorNumChart
  },
  initPerChart:function(){
    let that = this;
    let wrongPerOption = {
      color: ['#1966FF', '#FFBA00'],
      tooltip: {
          show: false,
          trigger: 'none',
          triggerOn: 'none',
          formatter: ' {c} <hr> {b}',
          showContent: false,
      },
      legend: {
          orient: 'horizontal',
          left: 'left',
          data: ['正确率', '错题率'],
          show: false
      },
      series: [
            {
               name: '',
               type: 'pie',
               clickable: false,
               hoverAnimation: false,
               legendHoverLink: false,
               silent: false,
               radius: ['35%', '55%'],
               label: {
                   normal: {
                       formatter: '{c|{c}%} \n{hr|}\n {b|{b}}  ',
                       padding:[0,-60],

                       rich: {
                           b: {
                             align:"center",
                             color: "#A1A4B3",
                             fontSize:15,
                             lineHeight:24
                           },
                           hr:{
                            width:"100%",
                            color: '#A1A4B3'
                           },
                           c: {
                             align:"center",
                             color:"#45464D",
                             fontWeight:600,
                             fontSize:15,
                             lineHeight:20
                           }
                       }
                   }
               },
               labelLine: {
                   normal: {
                       show:true,
                       length:15,
                       length2:70,
                       color: '#A1A4B3'
                   }
               },
               data:this.data.errorPer
            }
      ]
    }
    let errorPerChart;
    this.errorPerComponent = this.selectComponent("#wrongPerChart");
    this.errorPerComponent.init((canvas,width,height) => {
      errorPerChart = echarts.init(canvas,null,{
        width:width,
        height:height
      })
      canvas.setChart(errorPerChart);
      errorPerChart.setOption(wrongPerOption);
    })
    return errorPerChart
  },
  swichNav: function( e ) {
    var that = this;
    if( this.data.currentTab === e.target.dataset.current ) {
     return false;
    } else {
     that.setData( {
      currentTab: e.target.dataset.current
     })
     that.getData(e);

    }
   },
   wrongSwichNav: function( e ) {
    var that = this;
    if( this.data.wrongCurrentTab === e.target.dataset.current ) {
     return false;
    } else {
     that.setData( {
      wrongCurrentTab: e.target.dataset.current
     })
    }
    that.getData(e);
   },
   perSwichNav: function( e ) {
    var that = this;
    if( this.data.perCurrentTab === e.target.dataset.current ) {
     return false;
    } else {
     that.setData( {
      perCurrentTab: e.target.dataset.current
     })
    }
    that.getData(e);
   },
   viweDetail:function(){
    wx.navigateTo({
      url: '../examHistory/examHistory',
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();

  },
  getData:function(e){
    let id="";
    let offset;
    if(e){
       id =  e.currentTarget.id
       if(e.currentTarget.dataset.current==0){
        offset="week"
      }else{
        offset="month"
      }
    }else{
      offset = "week"
    }


    let that = this

    // if(that.data.currentTab == 1 || that.data.wrongCurrentTab == 1 || that.data.perCurrentTab == 1){
    //   offset = "month"
    // }
    let param = {offset:offset}
    request(api.studentTestActivityReport,'post',param).then(res => {
      let detail = res.details
      let _answerNum = [] ;
      let _answerDate = [] ;
      let _errorDate = [] ;
      let _errorNum = [] ;
      let _errorTotal = 0
      let _answerTotal = 0
      let _errorPer = []
      let _answerAve = 0;
      let _errorAve = 0;
      let _answerMaxDate = detail[0].date.substring(detail[0].date.indexOf("-")+1)
      let _errorMaxDate = detail[0].date.substring(detail[0].date.indexOf("-")+1)
      let _answerMaxCount = detail[0].questionCount
      let _errorMaxCount =  detail[0].errorCount

      if(id=="answerNumM"||id=="answerNumW"){
         detail.forEach((item,i) => {
          _answerNum.push(item.questionCount)
          _answerDate.push(item.date.substring(item.date.indexOf("-")+1))
          _answerTotal += item.questionCount
          if(item.questionCount>_answerMaxCount){
            _answerMaxCount=item.questionCount
            _answerMaxDate = item.date.substring(item.date.indexOf("-")+1)
          }
        })
        if(offset=="week"){
          _answerAve = parseInt(_answerTotal/7)
        }else{
         _answerAve = parseInt(_answerTotal/30)
        }
        that.setData({
          answerTotal:_answerTotal,
          answerNum:_answerNum,
          answerDate:_answerDate,
          answerAve:_answerAve,
          answerMaxDate:_answerMaxDate,
        })
      }else if(id=="wrongNumM"||id=="wrongNumW"){
        detail.forEach((item,i) => {
          _errorDate.push(item.date.substring(item.date.indexOf("-")+1))
          _errorNum.push(item.errorCount)
          _errorTotal += item.errorCount
          if(item.errorCount>_errorMaxCount){
            _errorMaxCount=item.errorCount
            _errorMaxDate = item.date.substring(item.date.indexOf("-")+1)
          }
        })
        if(offset=="week"){
          _errorAve = parseInt(_errorTotal/7)
        }else{
         _errorAve = parseInt(_errorTotal/30)
        }
        that.setData({
          errorNum:_errorNum,
          errorTotal:_errorTotal,
          errorDate:_errorDate,
          errorAve:_errorAve,
          errorMaxDate:_errorMaxDate
        })
      }else if(id=="wrongPerW" || id == "wrongPerM"){
        detail.forEach((item,i) => {

          _errorTotal += item.errorCount
          _answerTotal += item.questionCount
        })
        _errorPer = [
          { value: parseInt((1-(_errorTotal/_answerTotal))*100), name: '正确率', },
          { value: parseInt((_errorTotal/_answerTotal)*100), name: '错题率' },
        ]
        that.setData({
          errorPer:_errorPer,
        })
      }else {
        detail.forEach((item,i) => {
          _answerNum.push(item.questionCount)
          _answerDate.push(item.date.substring(item.date.indexOf("-")+1))
          _errorDate.push(item.date.substring(item.date.indexOf("-")+1))
          _errorNum.push(item.errorCount)
          _errorTotal += item.errorCount
          _answerTotal += item.questionCount

          if(item.questionCount>_answerMaxCount){
            _answerMaxCount=item.questionCount
            _answerMaxDate = item.date.substring(item.date.indexOf("-")+1)
          }
          if(item.errorCount>_errorMaxCount){
            _errorMaxCount=item.errorCount
            _errorMaxDate = item.date.substring(item.date.indexOf("-")+1)
          }
          _errorPer = [
            { value: parseInt((1-(_errorTotal/_answerTotal))*100), name: '正确率', },
            { value: parseInt((_errorTotal/_answerTotal)*100), name: '错题率' },
          ]
        })
        if(offset=="week"){
          _answerAve = parseInt(_answerTotal/7)
          _errorAve = parseInt(_errorTotal/7)
        }else{nani
         _answerAve = parseInt(_answerTotal/30)
         _errorAve = parseInt(_errorTotal/30)
        }
        that.setData({
          countArrangement:res.countArrangement,
          countRecord:res.countRecord,
          answerNum:_answerNum,
          answerDate:_answerDate,
          errorDate:_errorDate,
          errorNum:_errorNum,
          errorTotal:_errorTotal,
          answerTotal:_answerTotal,
          errorPer:_errorPer,
          answerAve:_answerAve,
          errorAve:_errorAve,
          answerMaxDate:_answerMaxDate,
          errorMaxDate:_errorMaxDate
        })

      }
      this.initAnswerChart();
      this.initErrorChart();
      this.initPerChart()
      // that.initAnswerChart()

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
