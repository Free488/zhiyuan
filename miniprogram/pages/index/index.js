Page({
  data: {
    userName: "小明",
    roleText: "同学",
    noticeList: [
      "每周五晚资料部整理文件查看更多",
      "上传文件请规范命名，方便大家查找",
      "如资料失效，请联系管理员补传",
      "请勿上传无关、违规文件"
    ],
    currentNotice: "",
    noticeIndex: 0,
    timer: null
  },

  onShow() {
    const userInfo = wx.getStorageSync("userInfo")
    if(userInfo){
      let roleText = "同学"
      if(userInfo.role === "teacher") roleText = "老师"
      if(userInfo.role === "member") roleText = "资料管理员"
      this.setData({
        userName: userInfo.id,
        roleText
      })
    }
    this.startNoticeTimer()
  },

  startNoticeTimer(){
    this.setData({
      currentNotice: this.data.noticeList[this.data.noticeIndex]
    })
    const timer = setInterval(()=>{
      let newIdx = this.data.noticeIndex + 1
      if(newIdx >= this.data.noticeList.length){
        newIdx = 0
      }
      this.setData({
        noticeIndex: newIdx,
        currentNotice: this.data.noticeList[newIdx]
      })
    },10000)
    this.setData({timer})
  },

  onUnload(){
    if(this.data.timer){
      clearInterval(this.data.timer)
    }
  },

  goNoticeDetail(){
    wx.navigateTo({
      url: "/pages/notice/notice"
    })
  },

  goDownload(){
    wx.navigateTo({url:"/pages/download/download"})
  },
  goUpload(){
    wx.navigateTo({url:"/pages/upload/upload"})
  },

  logout(){
    wx.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      confirmText: "退出",
      cancelText: "取消",
      success: (res) => {
        if(res.confirm){
          wx.clearStorageSync()
          wx.reLaunch({url:"/pages/login/index"})
        }
      }
    })
  }
})