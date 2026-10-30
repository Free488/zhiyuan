Page({
  data: {
    // 学科目录，你后面可以自己增删
    subjectList: [
      "高等数学",
      "英语",
      "C语言",
      "大学物理"
    ]
  },
  // 点击学科，后续我们再做对应学科的文件列表页
  goFileList(e){
    const subject = e.currentTarget.dataset.subject
    wx.showToast({
      title: "选中："+subject,
      icon:"none"
    })
  }
})