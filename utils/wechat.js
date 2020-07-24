
//获取自定义属性
const getElementData = (el,name) => {
    if (name) {
        return el.currentTarget.dataset[name]
    } else {
        return el.currentTarget.dataset
    }
}

//toast提示
const showToast = (title = '', mask = false ,icon = 'none' , duration = 2000) => {
    wx.showToast({
        title: title,
        icon: icon,
        duration: duration,
        mask: mask
    })
}

//loading
const showLoading = (title = '加载中',mask = true) => {
    wx.showLoading({
        title: title,
        mask: mask
    })
}

const wechatMethods = {    
    getElementData,
    showToast,
    showLoading
}

export default wechatMethods
