Page({
  data: {
    studentName: ""
  },
  onLoad() {
    const userInfo = wx.getStorageSync("userInfo")
    if (!userInfo || userInfo.type !== "student") {
      wx.redirectTo({ url: "/pages/login/login" })
      return
    }
    this.setData({
      studentName: userInfo.name
    })
  },
  goResource() {
    wx.navigateTo({ url: "/pages/resourceList/resourceList" })
  },
  goNotice() {
    wx.navigateTo({ url: "/pages/noticeList/noticeList" })
  },
  logout() {
    wx.clearStorageSync("userInfo")
    wx.redirectTo({ url: "/pages/login/login" })
  }
})