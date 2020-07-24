let app = getApp()
let wechat = app.globalData.wechat

//模拟试题包
import questionPack from './data'
import api from '../../utils/api'
import request from '../../utils/request'
let startX = 0,endX = 0

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 解析ID
        id: null,
        // 解析内容
        analysisContent: [],
        //当前的试题
        currentPage : 0,
        //试题总数量
        totalNum : 0,
        //轮播总页数
        totalPage : 0,
        //是否显示答题卡
        isShowAnswerCard : false,
        viewHeight: '430rpx',  // 阅读区域
        contentHeight: 'calc(100% - 430rpx)', // 可滑动做题区域
        isResizing : true,
        // 是否为解析
        analysisState: true,
        packIndex : [0,0],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.queryCurrentPage = options.currentPage
        if(options.currentPage) {
            this.setData({
                id : options.id
            })
        }else {
            this.setData({
                id : options.id
            })
        }
        this.getList()
    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },

     //试题切换监听
    onChange (event) {
        let { currentItemId } = event.detail
        // console.log(currentItemId)
        if (currentItemId) {
            let currentIdList  = currentItemId.split('-')
            this.setData({
                packIndex : currentIdList
            })
        }
        // console.log(event)
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
    },

    //复合题切换监听
    onChangeChild (event) {
        this.pauseAudio()
    },

     /**
     * 复合题轮播滑动结束监听
     * @param event
     */
    handleStart: function (event) {
        // console.log(event)
        // 赋值
        startX= event.touches[0].pageX
        // console.log('开始',startX)
    },
    handleEnd: function (event) {
        // console.log(event)
        // 赋值
        endX= event.changedTouches[0].pageX
        // console.log('结束',endX)
    },
    swiperFinish (event) {
        let questionItem;
        const current = event.detail.current
        let { packIndex } = this.data
        if (packIndex && packIndex.length > 0) {
            questionItem = this.data.analysisContent[packIndex[0]].questions[packIndex[1]]
        }
        if (event.detail.source) {
            let removeResult = parseInt(endX-startX)
            if (this.data.childCurrentPage === questionItem.subQuestions.length - 1) {
                if(questionItem.subQuestions.length ===1) {
                    // console.log('结果',removeResult)
                    if(removeResult>= 0) {
                        return
                    }
                }
                if (this.data.analysisContent[packIndex[0]].questions[parseInt(packIndex[1]+1)] || this.data.analysisContent[parseInt(packIndex[0]) + 1]) {
                    let currentPage = this.data.currentPage + 1
                    this.setData({
                        currentPage
                    })
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

    // 获取试题答案
    getList() {
        let data = {
            // answerPaperRecordId: 'b6fa0fa2-2034-4add-8c04-4911d53de8da'
            // answerPaperRecordId: '89cc76ef-5b43-41f0-a946-f545382d608d'
            answerPaperRecordId: this.data.id
        }
        request(api.QueryAnswerPaperDetails,'post',data).then((res)=> {
            // console.log(res)
            let analysisContent =  res.paperStructures   // 答题卡
            let totalNum = 0
            let swiperItemId = 0
            let totalPage = 0
            let newAnalysisContent = analysisContent.filter(item => item.parentId)
            newAnalysisContent.forEach((item) => {
                swiperItemId++
                // totalPage++
                item.questions.forEach((item) => {
                    if (item.answerMode !== 'Composite') {
                        if (item.stem.indexOf('audio') !== -1) {
                            item.audioSrc = this.getAudioSrc(item.stem)
                        }
                        if (item.stem.indexOf('<video') !== -1) {
                            item.stem = item.stem.replace(/controls=""/g,'controls="true"')
                        }
                    } else {
                        item.subQuestions.forEach(subItem => {
                            if (subItem.stem.indexOf('audio') !== -1) {
                                subItem.audioSrc = this.getAudioSrc(subItem.stem)
                            }
                            if (subItem.stem.indexOf('<video') !== -1) {
                                subItem.stem = subItem.stem.replace(/controls=""/g,'controls="true"')
                            }
                        })
                    }
                    item.swiperItemId = swiperItemId
                    item.currentPage = totalPage
                    totalNum++
                    totalPage++
                })

            })

            this.setData({
                totalNum,
                totalPage,
                analysisContent : newAnalysisContent
            })

            if (this.queryCurrentPage) {
                this.setData({
                    currentPage : parseInt(this.queryCurrentPage)
                })
            }
        })
    },

    //下一题
    nextQuestion () {
        let current = this.data.currentPage
        if (current < this.data.totalPage - 1) {
            this.setData({
                currentPage : current + 1
            })
        } else {
            wechat.showToast('已经是最后一题了哦~')
        }

    },
    //上一题
    prevQuestion () {
        let current = this.data.currentPage
        if (current > 0) {
            this.setData({
                currentPage : current - 1
            })
        }
    },
    //显示答题卡
    showAnswerCard () {
      this.setData({ isShowAnswerCard : true })
    },
    //隐藏答题卡
    hideAnswerCard () {
      this.setData({ isShowAnswerCard : false })
    },
    //跳转到指定题目
    goCurrentPage (e) {
        let { currentPage } = e.detail
        this.setData({ currentPage })
        this.hideAnswerCard()
    },
    startResize () {
        this.setData({
            isResizing : false
        })
    },

    resizing (event) {
        let pageY = event.changedTouches[0].pageY;
        pageY = pageY < 50 ? 50 : pageY > 450 ? 450 : pageY;
        this.replaceDataOnPath(['viewHeight'], `${pageY}px`);
        this.replaceDataOnPath(['contentHeight'], `calc(100% - ${pageY}px)`);
    },
    endResize () {
        this.applyDataUpdates();
        this.setData({
            isResizing : true
        })
    },
})
