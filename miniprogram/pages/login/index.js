Page({
  data: {
    id: "",
    pwd: "",
    loading: false,
    role: "student",
    titleText: "普通学生登录",
    showSelect: false
  },

  showRoleSelect() {
    this.setData({
      showSelect: !this.data.showSelect
    })
  },
  closeMask() {
    this.setData({ showSelect: false })
  },
  noop() {},

  changeRole(e) {
    const r = e.currentTarget.dataset.role
    let text = ""
    if(r === "student") text = "普通学生登录"
    else if(r === "teacher") text = "老师登录"
    else if(r === "member") text = "资料部学生登录"
    this.setData({
      role: r,
      titleText: text,
      showSelect: false
    })
  },

  onInputId(e) {
    this.setData({
      id: e.detail.value
    })
  },
  onInputPwd(e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  handleLogin() {
    if (this.data.loading) return
    const id = this.data.id.trim()
    const pwd = this.data.pwd.trim()
    if (!id || !pwd) {
      wx.showToast({
        title: "账号和密码不能为空",
        icon: "none"
      })
      return
    }
    this.setData({ loading: true })
    console.log("开始调用云函数，参数：",{id, pwd, role:this.data.role})
    wx.cloud.callFunction({
      name: "login",
      data: {
        id: id,
        pwd: pwd,
        role: this.data.role
      },
      success: res => {
        console.log("云函数返回结果：", res.result)
        const ret = res.result
        // 重点修改：判断 success 而不是 code===0
        if (ret.success) {
          console.log("✅校验通过，准备跳转")
          wx.setStorageSync("userInfo", ret.data)
          wx.reLaunch({
            url: "/pages/index/index",
            success(){
              console.log("✅跳转成功")
            },
            fail(err){
              console.log("❌跳转失败",err)
            }
          })
        } else {
          console.log("❌账号校验失败",ret.msg)
          wx.showToast({
            title: ret.msg || "账号密码错误",
            icon: "none"
          })
        }
      },
      fail: (err) => {
        console.log("❌调用云函数失败",err)
        wx.showToast({
          title: "请求失败，请检查网络",
          icon: "none"
        })
      },
      complete: () => {
        this.setData({ loading: false })
      }
    })
  }
})