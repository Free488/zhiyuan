App({
  onLaunch: function () {
    this.globalData = {
      env: "cloud1-d5g4191b044d1e885",
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
  }
})