const app = getApp()

const wechat = app.globalData.wechat

import api from '../../utils/api'
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      submitPaper : null,
      answerPaperRecordId : null,
      analysisList : [],
      //考试用时
      useTime : 0,
      //成绩
      currentPaperScore : 0,
      //总分
      totalScore : 0,
      //回答错误
      wrongNum : 0,
      //未作答
      notAnswerNum : 0,
      //试卷id
      id : null,
      //解析id
      analysisId : null,
      //是否人脸
      isFace : null,
      paperId : null,
      name : null
  },

    lookAnalysis (e) {
        let currentPage = wechat.getElementData(e,'currentpage')

        let url = `/pages/analysisItem/analysisItem?id=${this.data.analysisId}`

        if (currentPage !== undefined) {
            url += `&currentPage=${currentPage}`
        }

        wx.navigateTo({ url })
    },

    tryItOnce () {
      if (this.data.isFace) {
          wx.navigateBack({
              delta : 1
          })
      } else {
          wx.redirectTo({
              url: `/pages/examinationItem/examinationItem?id=${this.data.id}`
          })
      }
    },
    //获取解析
    getAnalysis () {

        wechat.showLoading()

        let params = {
            answerPaperRecordId : this.data.answerPaperRecordId
        }
        let wrongNum = 0,notAnswerNum = 0;

        request(api.QueryAnswerPaperDetails,'post',params).then(res => {

          let analysisList = res.paperStructures.filter(item => item.questions.length > 0)

          let currentPage = 0

          analysisList.forEach(packItem => {

            packItem.questions.forEach(item => {

              item.currentPage = currentPage
              currentPage++

              if (item.answerStatus === 0) {
                  item.answerCardState = 'right'
              }   else if (item.answerStatus === 1) {
                  item.answerCardState = 'right'
              } else if (item.answerStatus === 2) {
                  if (item.answerContent === null) {
                      item.answerCardState = 'default'
                      notAnswerNum++
                  } else {
                      item.answerCardState = 'wrong'
                      wrongNum++
                  }
              }

            })
          })

          this.setData({
              useTime : Math.floor(res.useTime/60),
              currentPaperScore : res.achievement,
              totalScore : res.paperScore,
              id : res.arrangementid,
              analysisId : res.answerPaperRecordId,
              analysisList,
              notAnswerNum,
              wrongNum
          })
          wx.hideLoading()
        })
        .catch(err => {
            wx.hideLoading()
            wechat.showToast('获取失败')
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ answerPaperRecordId , isFace , id , name }) {
    this.setData({
        submitPaper : app.globalData.submitPaperData,
        answerPaperRecordId,
        isFace,
        name,
        paperId : id
    })
    this.getAnalysis()
  },

})
