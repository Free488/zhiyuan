const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { account, password, loginType } = event
  if (!account || !password || !loginType) {
    return { success: false, msg: "参数不完整" }
  }
  let coll = ""
  if(loginType === "teacher"){
    coll = "teacher"
  }else if(loginType === "student" || loginType === "member"){
    coll = "students"
  }else{
    return { success: false, msg: "登录类型错误" }
  }
  try {
    const { data } = await db.collection(coll)
      .where({ account, password })
      .limit(1)
      .get()
    if (data.length) {
      const user = data[0]
      user.type = loginType
      return { success: true, data: user }
    }
    return { success: false, msg: "账号或者密码错误" }
  } catch (err) {
    return { success: false, msg: "数据库查询失败" }
  }
}