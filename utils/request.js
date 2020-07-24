const request = (requestUrl,method,data) => {
    let requestPromise = new Promise((resolve,reject) => {
        wx.request({
          url: requestUrl,
          method,
          data,
          header : {
            'content-type' : method === 'post'?'application/x-www-form-urlencoded':'application/json',
             "cookie": wx.getStorageSync("sessionId")
          },
          success : res => {
            //请求成功
            if (res.data.status === 1) {
              resolve( res.data.data);
            } else {
              wx.hideLoading()
              reject( res.data.error );
            }
          },
          fail : err => {
            wx.hideLoading()
            wx.showToast({
              title: '抱歉，服务器开小差了~',
              icon: 'none',
              duration: 2000
            })
          }
        })
    })
    return requestPromise
}

export default request
