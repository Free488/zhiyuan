Page({
  data: {
    subjectList: ["高等数学","英语","C语言","大学物理"],
    selectedSubject:"",
    name:"",
    fileName:"",
    filePath:""
  },
  changeSubject(e){
    this.setData({
      selectedSubject: this.data.subjectList[e.detail.value]
    })
  },
  inputName(e){
    this.setData({
      name: e.detail.value
    })
  },
  chooseFile(){
    wx.chooseMessageFile({
      count:1,
      type:"file",
      success:res=>{
        const file = res.tempFiles[0]
        this.setData({
          fileName: file.name,
          filePath: file.path
        })
      }
    })
  },
  submit(){
    if(!this.data.selectedSubject){
      wx.showToast({title:"请选择学科",icon:"none"})
      return
    }
    if(!this.data.name){
      wx.showToast({title:"请填写资料名称",icon:"none"})
      return
    }
    if(!this.data.filePath){
      wx.showToast({title:"请选择文件",icon:"none"})
      return
    }
    wx.showToast({title:"提交成功（后面对接云存储）"})
  }
})