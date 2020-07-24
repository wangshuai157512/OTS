import request from "../../utils/request";

const app = getApp()
const wechat = app.globalData.wechat

import api from "../../utils/api";

import paper from '../../utils/paper'

import upload from '../../utils/upload'

import eventsBus from '../../utils/eventsBus'
let startX = 0,endX = 0
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //试题包
        questionPack : [],
        //提交试卷需要的数据
        submitData : {},
        //当前的试题
        currentPage : 0,
        //当前子试题
        childCurrentPage : 0,
        //试题总数量
        totalNum : 0,
        //未作答数量
        noAnswerNum : 0,
        //轮播总页数
        totalPage : 0,
        //是否显示答题卡
        isShowAnswerCard : false,
        // 标题是否加粗
        analysisState:true,
        viewHeight: '430rpx',
        contentHeight: 'calc(100% - 430rpx)',
        isResizing : true,
        //未答完遮罩层
        isShowModel : false,
        //试卷时间
        paperTime : 0,
        //是否倒计时
        timeLimitEnabled : false,
        //已答题时间
        useTime : 0,
        //上页面传入参数
        query : {},
        packIndex : [],
        //保存
        tempSave : {
            tempSaveAnswerTime : 0,
            isSave : false
        },
        //是否去答题页面
        closePageAfterSubmit : false,
        isHidden : false,
        //最短提交时间
        minimumCommitTime : 0,
        //最短时间内拍照的次数
        takePhotoInMinimumCommitTime : 0,
        //已经拍照的次数
        photoInPocessTest : 0,
        autoPhotoTimes : 0,
        //是否打开了授权
        isGoSettingAuth : false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this
        this.setData({
            query : options
        })
        let isFace = this.data.query.isFace
        let id = this.data.query.id
        if (isFace) {
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.camera']) {
                console.log("已获取摄像头权限");
                _this.getQustion()
              } else {
                wx.authorize({
                  scope: 'scope.camera',
                  success() {
                    console.log("已获取摄像头权限");
                    _this.getQustion()
                  },
                  fail() {
                    wx.showModal({
                      title: '提示',
                      content: '请开启摄像头权限',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          //
                          // wx.navigateBack({
                          //   delta: 1
                          // })
                          _this.setData({
                            isGoSettingAuth : true
                          })
                          wx.openSetting({
                            success (res) {
                              console.log(res)

                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            }
          })
        } else {
          this.getQustion()
        }
    },
    onShow: function () {
        let _this = this
        if (this.data.isGoSettingAuth) {
          wx.getSetting({
            success : res => {
              if (res.authSetting['scope.camera']) {
                console.log("已获取摄像头权限");
                _this.setData({
                  isGoSettingAuth : false
                })
                _this.getQustion()
              } else {
                wx.showModal({
                  title: '提示',
                  content: '请开启摄像头权限',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting()
                    }
                  }
                })
              }
            }
          })
        }
        if (this.data.isHidden && !this.data.isGoSettingAuth) {
            this.setTime()
            this.savePaperRecord()
        }
    },
    onHide: function () {
        this.setData({
            isHidden : true
        })
    },
    onUnload: function () {
        if (this.questionFoot) {
            this.questionFoot.clearTimer()
        }
        clearInterval(this.saveRecordTimer)
        clearTimeout(this.camOut)
        eventsBus.remove('checkFace')
        this.camOut = null
    },
    onReady () { },

    /**
     * 计算时间
     */
    setTime () {
        wechat.showLoading('加载中')
        let url = api.getAnswerPaperTime
        let data = {
            arrangementId: this.data.query.id,
            answerPaperRecordId : this.data.submitData.answerPaperRecordId
        }
        request(url,'post',data).then(res => {
            let answerData = paper.isAnswerPaperState(res.answerPaperFlag)
            if (answerData.isAnswer) {
                this.setData({
                    paperTime : res.paperTime,
                    useTime : res.useTime
                })
            } else {
                wechat.showToast(answerData.msg,true)
            }
            wx.hideLoading()
        })
    },

    /**
     * 试题切换监听
     * @param event
     */
    onChange (event) {
        let { currentItemId } = event.detail
        if (currentItemId && currentItemId !== 'last-swiper-item') {
            let currentIdList  = currentItemId.split('-')
            this.setData({
                packIndex : currentIdList
            })
        }
        if (event.detail.source) {
            const current = event.detail.current
            this.setData({
                currentPage : current
            })
        }
        this.setData({
            childCurrentPage : 0
        })
        this.pauseAudio()

        if (currentItemId === 'last-swiper-item') {
            let noAnswerNum = 0
            this.data.questionPack.forEach(packItem => {
                packItem.paperQuestionList.forEach(questionItem => {
                    if (!questionItem.isAnswer) {
                        noAnswerNum++
                    }
                })
            })
            this.setData({ noAnswerNum })
        }
    },

    /**
     * 复合题切换监听
     * @param event
     */
    onChangeChild (event) {
        this.pauseAudio()
    },

    /**
     * 复合题轮播滑动结束监听
     * @param event
     */
    handleStart: function (event) {
        startX= event.touches[0].pageX
    },
    handleEnd: function (event) {
        endX= event.changedTouches[0].pageX
    },
    swiperFinish (event) {
        let questionItem;
        const current = event.detail.current
        let { packIndex } = this.data
        if (packIndex && packIndex.length > 0) {
            questionItem = this.data.questionPack[packIndex[0]].paperQuestionList[packIndex[1]]
        }
        if (event.detail.source) {
            let removeResult = parseInt(endX-startX)
            if (this.data.childCurrentPage === questionItem.subqustionList.length - 1) {
                if(questionItem.subqustionList.length ===1) {
                    if(removeResult>= 0) { return }
                }
                if (current >= this.data.childCurrentPage) {
                    let currentPage = this.data.currentPage + 1
                    this.setData({ currentPage })
                }
            }
            this.setData({
                childCurrentPage : current
            })
        }
    },

    /**
     * 暂停音乐
     */

    pauseAudio () {
        let audioList = app.globalData.audioExa
        audioList.forEach(item => {
            item.audioItem.pause()
        })
    },

    /**
     * 获取audio标签的src
     */
    getAudioSrc (stem) {
        let audioStr = stem.match(/<audio.*<\/audio>/)[0]
        let stemSrc = audioStr.match(/src="(\S*)"/)[1]
        return stemSrc
    },

    /**
     * 获取试题
     */
    getQustion () {
        wechat.showLoading('加载中')
        let isFace = this.data.query.isFace
        let url = isFace?api.StartAnswerPaperWithPhotoByMini:api.StartAnswerPaperByMini

        let data = {
            arrangementId: this.data.query.id
        }
        request(url,'post',data).then(res => {
            let answerData = paper.isAnswerPaperState(res.answerPaperFlag)
            console.log(answerData)
            if (answerData.isAnswer) {
                let { arrangementId,tempSaveAnswerExpire,answerPaperRecordId,studentTestActivityScoreId,resourcePackageId } = res
                wx.setNavigationBarTitle({ title : res.arrangementName })
                let questionPack = res.paper.psOutputDto ? res.paper.psOutputDto : []
                let totalPage = 0,totalNum = 0
                let newQuestionPack = questionPack.filter(item => item.paperQuestionList)
                newQuestionPack.forEach((item) => {
                    totalPage++
                    item.paperQuestionList.forEach((questionItem) => {
                        if (questionItem.answerMode !== 'Composite') {

                            /**
                             * 答题记录，如果有作答则将作答内容填充到试题
                             */
                            let answerRecord = questionItem.answerRecord
                            switch (questionItem.answerMode) {
                                case 'SingleSelection':
                                    if (answerRecord.content) {
                                        questionItem.optionID = answerRecord.content.id
                                        questionItem.isAnswer = true
                                    }
                                    break
                                case 'BlankFilling':
                                    if (answerRecord.content) {
                                        let isAnswerList = answerRecord.content.pairList.filter(pairItem => pairItem.content)
                                        if (answerRecord.content.pairList) {
                                            questionItem.optionIDs = answerRecord.content.pairList
                                        }
                                        if (isAnswerList.length > 0) {
                                            questionItem.isAnswer = true
                                        }
                                    }
                                    break
                                case 'MultiSelection':
                                    if (answerRecord.content) {
                                        questionItem.optionIDs = answerRecord.content.idList
                                        questionItem.isAnswer = true
                                    }
                                    break
                                case 'Judgement':
                                    if (answerRecord.content) {
                                        questionItem.optionID = answerRecord.content.id
                                        questionItem.isAnswer = true
                                    }
                                    break
                                case 'EssayQuestion':
                                    if (answerRecord.content) {
                                        questionItem.optionID = answerRecord.content.content
                                        if (answerRecord.content.content !== '<p><br></p>') {
                                            questionItem.isAnswer = true
                                        }
                                    }
                                    break
                                case 'JudgementCorrectsMistakes':
                                    if (answerRecord.content) {
                                        questionItem.optionID = answerRecord.content
                                        questionItem.isAnswer = true
                                    }
                                    break
                            }

                            /**
                             * 判断标签是否包含audio标签
                             */
                            try {
                                if (questionItem.stem.indexOf('audio') !== -1) {

                                    questionItem.audioSrc = this.getAudioSrc(questionItem.stem)

                                }

                                if (questionItem.stem.indexOf('<video') !== -1) {
                                    questionItem.stem = questionItem.stem.replace(/controls=""/g,'controls="true"')
                                }
                            }catch (e) {

                            }

                        } else {
                            /**
                             * 复合题作答记录
                             * @type {Array}
                             */
                            let subqustionList = questionItem.subqustionList ? questionItem.subqustionList : []
                            subqustionList.forEach(subItem => {
                                console.log(subItem)
                                let answerRecord = subItem.answerRecord
                                switch (subItem.answerMode) {
                                    case 'SingleSelection':
                                        if (answerRecord.content) {
                                            subItem.optionID = answerRecord.content.id
                                            subItem.isAnswer = true
                                        }
                                        break
                                    case 'BlankFilling':
                                        if (answerRecord.content) {
                                            let isAnswerList = answerRecord.content.pairList.filter(pairItem => pairItem.content)
                                            if (answerRecord.content.pairList) {
                                                subItem.optionIDs = answerRecord.content.pairList
                                            }
                                            if (isAnswerList.length > 0) {
                                                subItem.isAnswer = true
                                            }
                                        }
                                        break
                                    case 'MultiSelection':
                                        if (answerRecord.content) {
                                            subItem.optionIDs = answerRecord.content.idList
                                            subItem.isAnswer = true
                                        }
                                        break
                                    case 'Judgement':
                                        if (answerRecord.content) {
                                            subItem.optionID = answerRecord.content.id
                                            subItem.isAnswer = true
                                        }
                                        break
                                    case 'EssayQuestion':
                                        if (answerRecord.content) {
                                            subItem.optionID = answerRecord.content.content
                                            if (answerRecord.content.content !== '<p><br></p>') {
                                                subItem.isAnswer = true
                                            }
                                        }
                                        break
                                    case 'JudgementCorrectsMistakes':
                                        if (answerRecord.content) {
                                            subItem.optionID = answerRecord.content
                                            subItem.isAnswer = true
                                        }
                                        break
                                }

                                try {
                                    if (subItem.stem.indexOf('audio') !== -1) {

                                        subItem.audioSrc = this.getAudioSrc(subItem.stem)

                                    }

                                    if (subItem.stem.indexOf('<video') !== -1) {
                                        subItem.stem = subItem.stem.replace(/controls=""/g,'controls="true"')
                                    }
                                }catch (e) {

                                }

                            })

                            /**
                             * 判断复合题是都作答了，如果是则将题目更改为已作答状态
                             */
                            let isAnswerList = subqustionList.filter(subItem => subItem.isAnswer)

                            if (isAnswerList.length === subqustionList.length) {
                                questionItem.isAnswer = true
                            }

                        }
                        questionItem.currentPage = totalPage
                        totalPage++
                        totalNum++
                    })
                })
                this.setData({
                    totalNum,
                    totalPage,
                    questionPack : newQuestionPack,
                    paperTime : res.paperTime,
                    useTime : res.useTime,
                    timeLimitEnabled : res.timeLimitEnabled,
                    closePageAfterSubmit : res.closePageAfterSubmit,
                    minimumCommitTime : res.minimumCommitTime,
                    takePhotoInMinimumCommitTime : res.takePhotoInMinimumCommitTime,
                    photoInPocessTest : res.photoInPocessTest,
                    autoPhotoTimes : res.autoPhotoTimes,
                    submitData : {
                        arrangementId,
                        tempSaveAnswerExpire,
                        answerPaperRecordId,
                        studentTestActivityScoreId,
                        resourcePackageId,
                    },
                    tempSave : {
                        tempSaveAnswerTime : res.tempSaveAnswerTime,
                        isSave : res.tempSaveAnswer
                    }
                })

                this.saveRecord()

                this.questionFoot = this.selectComponent('#question-foot')

                wx.hideLoading()

                if (res.paperTime > 0 && res.timeLimitEnabled && res.takePhotoInTest) {
                    setTimeout(() => {
                        this.contrastRanDom()
                    },10000)
                }

            } else {
                wx.hideLoading()
                wechat.showToast(answerData.msg,true)
                setTimeout(() => {
                    wx.navigateBack({
                        delta : 1
                    })
                },2000)
            }
        })
        .catch(err => {
            wx.hideLoading()
        })
    },

    /**
     * 手动保存
     */
    savePaper () {
        this.submitPaper(1)
    },

    /**
     * 临时保存
     */
    saveRecord () {
        let _this = this
        let {tempSaveAnswerTime , isSave} = this.data.tempSave
        if (isSave) {
            this.saveRecordTimer = setInterval(() => {
                _this.savePaperRecord()
            },1000 * tempSaveAnswerTime)
        }
    },

    savePaperRecord () {
        let {arrangementId , answerPaperRecordId ,tempSaveAnswerExpire} = this.data.submitData
        let questionAnswerList = this.getAnswerQuestionData()
        let paperAnswerResult = {
            answerPaperRecordId,
            questionAnswerList
        }
        let params = {
            arrangementId,
            answerPaperRecordId,
            paperAnswerResult : JSON.stringify(paperAnswerResult),
            tempSaveAnswerExpire
        }

        request(api.TempSaveAnswerPaper,'post',params).then(res => { })
    },


    /**
     * 单选题、判断监听
     * @param e
     */
    onSingleChosen (e) {
        const detail = e.detail;
        let {
            optionID,packIndex,questionIndex
        } = detail;
        const questionPack = this.data.questionPack;
        const questionList = questionPack[packIndex].paperQuestionList;

        this.replaceDataOnPath([
            'questionPack',
             packIndex,
            'paperQuestionList',
             questionIndex,
            'optionID'
        ], optionID);

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'isAnswer'
        ], true);

        this.applyDataUpdates();

        // if (questionIndex + 1 >= questionList.length) {
        //     const nextPackIndex = packIndex + 1;
        //     const nextQuestionWrap = questionPack[nextPackIndex];
        //
        //     if (nextQuestionWrap) {
        //
        //     } else {
        //         wechat.showToast('已经是最后一题了哦~')
        //     }
        //
        // }
    },

    /**
     * 多选题监听
     * @param e
     */
    onMultipleChosen (e) {
        const detail = e.detail;
        const { optionIDs,packIndex,questionIndex } = detail

        this.replaceDataOnPath([
            'questionPack',
             packIndex,
            'paperQuestionList',
             questionIndex,
            'optionIDs'
        ], optionIDs);

        if (optionIDs && optionIDs.length > 0) {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], true);
        } else {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], false);
        }


        this.applyDataUpdates();

    },

    /**
     * 判断改错题监听
     * @param e
     */
    onJudgeCorrectionChosen (e) {
        let { optionID,packIndex,questionIndex,optionContent,content } = e.detail

        let data = {
            id : optionID
        }
        if (optionContent === '错' || optionContent === 'F') {
            data.content = content
        }

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'optionID'
        ], data);

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'isAnswer'
        ], true);

        this.applyDataUpdates();

    },

    /**
     * 填空题监听
     * @param e
     */
    onBlankFillingChosen (e) {
        let { optionIDs,packIndex,questionIndex } = e.detail

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'optionIDs'
        ], optionIDs);

        if (optionIDs && optionIDs.length > 0) {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], true);
        } else {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], false);
        }

        this.applyDataUpdates();

    },

    /**
     * 主观题监听
     * @param e
     */
    onEssayChosen (e) {
        let { html,packIndex,questionIndex } = e.detail
        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'optionID'
        ], html);

        if (html && html !== '<p><br></p>') {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], true);
        } else {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], false);
        }

        this.applyDataUpdates();

    },


    /**
     * 判断复合题是否都已答
     * @param packIndex (题型下标)
     * @param questionIndex (试题下标)
     */
    updateCompositeAnswerState (packIndex,questionIndex) {
        const questionPack = this.data.questionPack;
        const questionList = questionPack[packIndex].paperQuestionList;
        const subQuestionList = questionList[questionIndex].subqustionList


        let isAnswerQuestionList = subQuestionList.filter(item => item.isAnswer)

        if (isAnswerQuestionList.length === subQuestionList.length) {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], true);
        } else {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'isAnswer'
            ], false);
        }

        this.applyDataUpdates();

    },

    /**
     * 复合题单选、判断监听
     * @param e
     */
    onSubSingleChosen (e) {
        const { optionID,packIndex,questionIndex,subQuestionIndex } = e.detail
        const questionPack = this.data.questionPack;
        const questionList = questionPack[packIndex].paperQuestionList;
        const subQuestionList = questionList[questionIndex].subqustionList

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'subqustionList',
            subQuestionIndex,
            'optionID'
        ], optionID);

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'subqustionList',
            subQuestionIndex,
            'isAnswer'
        ], true);

        this.applyDataUpdates();

        this.updateCompositeAnswerState(packIndex,questionIndex)

    },

    /**
     * 复合多选监听
     * @param e
     */
    onSubMultipleChosen (e) {
        const detail = e.detail;
        const { optionIDs,packIndex,questionIndex,subQuestionIndex } = detail

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'subqustionList',
            subQuestionIndex,
            'optionIDs'
        ], optionIDs);

        if (optionIDs && optionIDs.length > 0) {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'subqustionList',
                subQuestionIndex,
                'isAnswer'
            ], true);
        } else {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'subqustionList',
                subQuestionIndex,
                'isAnswer'
            ], false);
        }

        this.applyDataUpdates();

        this.updateCompositeAnswerState(packIndex,questionIndex)

    },

    /**
     * 复合题填空监听
     * @param e
     */
    onSubBlankFillingChosen (e) {
        let { optionIDs,packIndex,questionIndex,subQuestionIndex } = e.detail

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'subqustionList',
            subQuestionIndex,
            'optionIDs'
        ], optionIDs);

        if (optionIDs && optionIDs.length > 0) {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'subqustionList',
                subQuestionIndex,
                'isAnswer'
            ], true);
        } else {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'subqustionList',
                subQuestionIndex,
                'isAnswer'
            ], false);
        }


        this.applyDataUpdates();

        this.updateCompositeAnswerState(packIndex,questionIndex)

    },

    /**
     * 复合题判断改错题监听
     * @param e
     */
    onSubJudgeCorrectionChosen (e) {
        let { optionID,packIndex,questionIndex,subQuestionIndex,optionContent,content } = e.detail

        let data = {
            id : optionID
        }
        if (optionContent === '错' || optionContent === 'F') {
            data.content = content
        }

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'subqustionList',
            subQuestionIndex,
            'optionID'
        ], data);

        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'subqustionList',
            subQuestionIndex,
            'isAnswer'
        ], true);

        this.applyDataUpdates();

        this.updateCompositeAnswerState(packIndex,questionIndex)

    },

    /**
     * 复合题主观题监听
     * @param e
     */
    onSubEssayChosen (e) {
        let { html,packIndex,questionIndex,subQuestionIndex } = e.detail
        this.replaceDataOnPath([
            'questionPack',
            packIndex,
            'paperQuestionList',
            questionIndex,
            'subqustionList',
            subQuestionIndex,
            'optionID'
        ], html);

        if (html && html !== '<p><br></p>') {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'subqustionList',
                subQuestionIndex,
                'isAnswer'
            ], true);
        } else {
            this.replaceDataOnPath([
                'questionPack',
                packIndex,
                'paperQuestionList',
                questionIndex,
                'subqustionList',
                subQuestionIndex,
                'isAnswer'
            ], false);
        }

        this.applyDataUpdates();

        this.updateCompositeAnswerState(packIndex,questionIndex)

    },

    submit (isFace) {
        if (isFace) {
            this.contrast()
        } else {
            this.submitPaper(0)
        }
    },

    /**
     * 判断是否需要人脸
     */
    isCheckFace () {
        let isFace =  this.data.query.isFace
        this.setData({
            isShowModel : false
        })
        let answerTime = app.globalData.paperDateTime / 60
        if (this.data.timeLimitEnabled && this.data.paperTime > 0 && this.data.minimumCommitTime) {
            if (answerTime >= this.data.minimumCommitTime) {
                this.submit(isFace)
            } else {
                wechat.showToast(`作答时长小于${this.data.minimumCommitTime}分钟，不能提交`)
            }
        } else {
            this.submit(isFace)
        }
    },

    /**
     * 提交试卷前判断是否都答完
     */
    isCheckAllAnswers () {
        let questionList = this.data.questionPack
        let isFace =  this.data.query.isFace
        let isAnswer = true
        try {
            questionList.forEach(packItem => {
                packItem.paperQuestionList.forEach(questionItem => {
                    if (!questionItem.isAnswer) {
                        throw new Error('notAllAnswer')
                    }
                })
            })
        }catch (e) {
            isAnswer = false
        }

        if (!isAnswer) {
            this.setData({
                isShowModel : true
            })
        } else {
            if (isFace) {
                this.contrast('2',false)
            } else {
                this.submitPaper(0)
            }
        }
    },

    /**
     * 提交(保存)试卷
     * @param temp (0：提交 1：保存)
     */
    submitPaper (temp) {
        let submitText = temp === 0?'提交中':'保存中'
        clearInterval(this.saveRecordTimer)
        wechat.showLoading(submitText,true)

        let { arrangementId,tempSaveAnswerExpire,answerPaperRecordId,studentTestActivityScoreId,resourcePackageId } = this.data.submitData
        let questionAnswerList = this.getAnswerQuestionData()

        let paperAnswerResult = {
            answerPaperRecordId,
            questionAnswerList
        }
        let params = {
            arrangementId,
            tempSaveAnswerExpire,
            answerPaperRecordId,
            studentTestActivityScoreId,
            resourcePackageId,
            temp,
            paperAnswerResult : JSON.stringify(paperAnswerResult)
        }

        request(api.SubmitAnswerPaper,'post',params).then(res => {

            let showText = temp===0?'提交成功':'答案已保存'

            wx.hideLoading()

            wechat.showToast(showText,true)

            if (temp === 1) {
                return
            }

            clearInterval(this.saveRecordTimer)

            app.globalData.submitPaperData = res
            app.globalData.isTimeOut = false

            /**
             * 判断是否去答题报告页面
             */
            if (this.data.closePageAfterSubmit) {

                setTimeout(() => {
                    wx.navigateBack({
                        delta : 1
                    })
                },1000)

            } else {
                let url = `/pages/examinationScore/examinationScore?answerPaperRecordId=${answerPaperRecordId}`

                if (this.data.query.isFace) {
                    url += `&isFace=${true}&id=${arrangementId}`
                }

                setTimeout(() => {
                    wx.redirectTo({ url })
                },1000)
            }

        }).catch(err => {
            wechat.showToast('提交失败')
            wx.hideLoading()
        })

        this.questionFoot.clearTimer()

        this.setData({
            isShowModel : false
        })
    },

    /**
     * 处理每个题型提交的数据结构
     * @param questionItem
     * @returns {{questionId: *, content: string}}
     */
    setSubmitQuestionData (questionItem) {
        if (questionItem.answerMode === 'SingleSelection' || questionItem.answerMode === 'Judgement') {
            return {
                questionId : questionItem.questionId,
                content : JSON.stringify({ id : questionItem.optionID })
            }
        } else if (questionItem.answerMode === 'MultiSelection') {
            return {
                questionId : questionItem.questionId,
                content : JSON.stringify({ idList : questionItem.optionIDs })
            }
        } else if (questionItem.answerMode === 'BlankFilling') {
            return {
                questionId : questionItem.questionId,
                content : JSON.stringify({ pairList : questionItem.optionIDs })
            }
        } else if (questionItem.answerMode === 'EssayQuestion') {
            return {
                questionId : questionItem.questionId,
                content : JSON.stringify({ content : questionItem.optionID })
            }
        } else if (questionItem.answerMode === 'JudgementCorrectsMistakes') {
            return {
                questionId : questionItem.questionId,
                content : JSON.stringify(questionItem.optionID)
            }
        }
    },

    /**
     * 处理提交试题格式
     * @returns {Array}
     */
    getAnswerQuestionData () {
        let questionAnswerList = []
        let questionPack = this.data.questionPack

        questionPack.forEach(packItem => {
            packItem.paperQuestionList.forEach(questionItem => {
                if (questionItem.answerMode !== 'Composite') {
                    if (questionItem.isAnswer) {
                        let submitQuestionData = this.setSubmitQuestionData(questionItem)
                        questionAnswerList.push(submitQuestionData)
                    }
                } else {
                    let subQuestionAnswerList = []
                    if (questionItem.subqustionList && questionItem.subqustionList.length > 0) {
                        questionItem.subqustionList.forEach(subQuestionItem => {
                            if (subQuestionItem.isAnswer) {
                                let submitQuestionData = this.setSubmitQuestionData(subQuestionItem)
                                subQuestionAnswerList.push(submitQuestionData)
                            }
                        })
                        if (subQuestionAnswerList.length > 0) {
                            questionAnswerList.push({
                                questionId : questionItem.questionId,
                                content : "",
                                subQuestionAnswerList
                            })
                        }
                    }
                }
            })
        })

        return questionAnswerList
    },

    /**
     * 下一题
     */
    nextQuestion () {
        let current = this.data.currentPage
        if (current < this.data.totalPage) {
            this.setData({
                currentPage : current + 1
            })
        } else {
            // wechat.showToast('已经是最后一题了哦~')
        }

    },
    /**
     * 上一题
     */
    prevQuestion () {
        let current = this.data.currentPage
        if (current > 0) {
            this.setData({
                currentPage : current - 1
            })
        }
    },
    /**
     * 显示答题卡
     */
    showAnswerCard () {
      this.setData({ isShowAnswerCard : true })
    },
    /**
     * 隐藏答题卡
     */
    hideAnswerCard () {
      this.setData({ isShowAnswerCard : false })
    },

    /**
     * 跳转到指定题目
     * @param e
     */
    goCurrentPage (e) {
        let { currentPage } = e.detail
        this.setData({ currentPage , childCurrentPage : 0 })
        this.hideAnswerCard()
    },

    /**
     * 复合题拖动禁止页面滑动
     */
    startResize () {
        this.setData({
            isResizing : false
        })
    },

    checkEvent () {
        this.setData({
            isShowModel : false
        })
    },

    /**
     * 复合题拖动修改页面高度
     * @param event
     */
    resizing (event) {
        let pageY = event.changedTouches[0].pageY;
        pageY = pageY < 50 ? 50 : pageY > 450 ? 450 : pageY;
        this.replaceDataOnPath(['viewHeight'], `${pageY}px`);
        this.replaceDataOnPath(['contentHeight'], `calc(100% - ${pageY}px)`);
    },

    /**
     * 复合题拖动结束
     */
    endResize () {
        this.applyDataUpdates();
        this.setData({
            isResizing : true
        })
    },

    /**
     * 人脸识别
     * @param type(3:考试 2:提交)
     */
    contrast () {
        let isTimeOut = app.globalData.isTimeOut
        let _this = this
        let { basePhoto,answerPaperId,id } = this.data.query
        upload.uploadImg(['camera']).then(res => {
            let { imgBase , imgType } = res
            let params = {
              arrangementId : id,
              imageStr : imgBase,
              extName : imgType,
              type : 2,
              answerPaperId : answerPaperId,
              basePhoto : basePhoto
            }
            request(api.faceCompare,'post',params).then(res => {
                if (res.photoEndTest) {
                    wx.hideLoading()
                    wx.showModal({
                        title: '提示',
                        content : '验证未通过',
                        confirmText : '再次验证',
                        showCancel : isTimeOut?false:true,
                        success (res) {
                            if (res.confirm) {
                                _this.contrast()
                            }
                        }
                    })
                } else {
                    this.submitPaper(0)
                }
              })
            .catch(err => {
                wechat.showToast('上传失败')
                _this.contrast()
            })
         }).catch(err => {
             if(err.msg === '相机调用失败') {
                 wx.showModal({
                     title: '提示',
                     content : '必须点击拍照才能继续提交',
                     showCancel: isTimeOut?false:true,
                     success (res) {
                         if (res.confirm) {
                             _this.contrast()
                         }
                     }
                 })
             }
         })
    },
    /*
    *获取随机数
    */
    getRandom: function (min, max) {
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min)
        return re;
    },
    /**
     * 人脸识别(随机拍照)
     * @param type(3:考试 2:提交)
     */
    contrastRanDom(){
        // let camOut = null
        let isTimeOut = app.globalData.isTimeOut
        let _this = this
        let { basePhoto,answerPaperId,id } = this.data.query
        if (this.data.photoInPocessTest >= this.data.autoPhotoTimes) {
            return
        }
      _this.setuploadImg().then(res => {
            let { imgBase , imgType } = res
            console.log(imgBase)
            let params = {
              arrangementId : id,
              imageStr : imgBase,
              extName : imgType,
              type : 3,
              answerPaperId : answerPaperId,
              basePhoto : basePhoto
            }
            request(api.faceCompare,'post',params).then(res => {
                    // wechat.showToast('上传成功')
                    // let cdata = UploadTestdata.data;
                    let paperUseTime;
                    // _this.autoPhotoTimes = cdata.autoPhotoTimes;
                    // _this.photoInPocessTest = cdata.photoInPocessTest;
                    if (res.useTime) {//考试已用时间
                        paperUseTime = res.useTime;
                    }
                    //前30分钟抓拍3张，后边时间随机抓拍2张。
                    if (_this.data.minimumCommitTime > 0 && _this.data.takePhotoInMinimumCommitTime > 0) {
                        let minTime = _this.data.minimumCommitTime * 60;//分换秒
                        let lastTime = minTime - paperUseTime;
                        if (_this.data.autoPhotoTimes > res.photoInPocessTest) {//如果照片不够
                            if (lastTime > 0) {//如果没超过最小提交时间
                                let JGtime = parseInt(lastTime / _this.data.takePhotoInMinimumCommitTime);//间隔时间(以秒为单位)
                                if (_this.data.takePhotoInMinimumCommitTime > res.photoInPocessTest) {
                                    //30分钟内抓拍
                                    _this.camOut = setTimeout(function () {
                                        let random = _this.getRandom(0, 10)
                                        setTimeout(function () {
                                          random = random * 1000;
                                            _this.contrastRanDom()
                                        }, random);
                                    }, JGtime * 1000);
                                } else {
                                    //30分钟后再次抓拍
                                    _this.camOut = setTimeout(function () {
                                        let random = _this.getRandom(0, 10)
                                        setTimeout(function () {
                                          random = random * 1000;
                                            _this.contrastRanDom()
                                        }, random);
                                    }, lastTime * 1000);
                                }
                            } else {//如果已经超过最小提交时间
                                let lastTimeF = _this.data.paperTime * 60 - paperUseTime;
                                let JGtime = parseInt(lastTimeF / _this.data.autoPhotoTimes);//间隔时间(以秒为单位)
                                _this.camOut = setTimeout(function () {
                                    let random = _this.getRandom(0, 10)
                                    setTimeout(function () {
                                      random = random * 1000;
                                        _this.contrastRanDom()
                                    }, random);
                                }, JGtime * 1000);
                            }
                        }
                    } else {//不需要
                        let lastTime = _this.data.paperTime * 60 - paperUseTime;
                        let JGtime = parseInt(lastTime / _this.data.autoPhotoTimes);//间隔时间(以秒为单位)
                        if (_this.data.autoPhotoTimes > res.photoInPocessTest) {
                            _this.camOut = setTimeout(function () {
                                let random = _this.getRandom(0, 10)
                                setTimeout(function () {
                                    random = random * 1000;
                                    _this.contrastRanDom()
                                }, random);
                            }, JGtime * 1000);//
                        }
                    }
              })
            .catch(err => {
                wechat.showToast('上传失败')
            })
         }).catch(err => {
             if(err.msg === '相机调用失败') {
                wx.showModal({
                    title: '提示',
                    content : '必须点击拍照才能继续考试',
                    showCancel: false,
                    success (res) {
                        _this.contrastRanDom()
                    }
                })
             }
         })
    },
  setuploadImg() {
      return new Promise((resolve, reject) => {
        let that = this
        let ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            console.log(res.tempImagePath)
            that.setData({
              src: res.tempImagePath
            })
            wx.getImageInfo({
              src: res.tempImagePath,
              success: res => {
                let imgBase = wx.getFileSystemManager().readFileSync(res.path, "base64")
                let imgType = res.type
                resolve({
                  imgBase,
                  imgType
                })
              },
              fail: err => {
                reject({
                  err: err,
                  msg: '获取图片信息失败'
                })
              }
            })
          }
        })

      })
  } ,
  binderror: function () {
    // console.log('用户拒绝授权')
    // let id = this.data.query.id;
    // wx.showModal({
    //   title: '提示',
    //   content: '请开启摄像头权限',
    //   showCancel: false,
    //   success(res) {
    //     if (res.confirm) {
    //       wx.navigateTo({
    //         url: `/pages/faceDistinguish/faceDistinguish?id=${id}`
    //       })
    //     }
    //   }
    // })
  },
  bindinitdone:function (){
    console.log('相机初始化')
  },
  bindstop: function () {
    console.log('停止')
  }
});

// closePageAfterSubmit 为 true 返回上一层  为false的话进答题报告
