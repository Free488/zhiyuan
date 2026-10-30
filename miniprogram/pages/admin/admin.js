Page({
  data:{
    user:{}
  },
  onLoad(){
    let user = wx.getStorageSync("user")
    if(!user || user.type !== "admin"){
      wx.showToast({title:"请先登录管理员账号",icon:"none"})
      wx.redirectTo({url:"/pages/login/index"})
      return
    }
    this.setData({user})
  },
  backLogin() {
    wx.removeStorageSync("user")
    wx.redirectTo({
      url: "/pages/login/index"
    })
  }
})