import wechat from './wechat'

/**
 * sourceType : Array  (调用相机还是相册)
 * quality : Number (图片压缩质量)
 *
 */
const uploadImg = (sourceType = ['album', 'camera'],quality = 10) => {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count : 1,
            sizeType: ['compressed'],
            sourceType,
            success : res => {
                wechat.showLoading('上传中')
                let isUse = wx.canIUse('compressImage')
                if (!isUse) {
                    reject({
                        err : '',
                        msg : '微信版本过低，请更新最新版本'
                    })
                } else {
                    console.log(369,res)
                    wx.compressImage({
                        src : res.tempFilePaths[0],
                        quality,
                        success : res => {
                            wx.getFileInfo({
                                filePath : res.tempFilePath,
                                success : res => {
                                    console.log(res,'压缩之后')
                                }
                            })
                            wx.getImageInfo({
                                src : res.tempFilePath,
                                success : res => {
                                    let imgBase = wx.getFileSystemManager().readFileSync(res.path, "base64")
                                    let imgType = res.type
                                    resolve({
                                        imgBase,
                                        imgType
                                    })
                                },
                                fail : err => {
                                    reject({
                                        err : err,
                                        msg : '获取图片信息失败'
                                    })
                                }
                            })
                        },
                        fail : err => {
                            reject({
                                err : err,
                                msg : '图片压缩失败'
                            })
                        }
                    })
                }
            },
            fail : err => {
                reject({
                    err : err,
                    msg : '相机调用失败'
                })
            }
        })
    })
}

export default {
    uploadImg
}
