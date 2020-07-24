const getCode = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success : res => {
                resolve(res.code)
            },
            fail : err => {
                wx.showToast({
                  title: 'code获取失败',
                  icon : 'none'
                })
                reject()
            }
        })
    })
}



export default {
    getCode
}
