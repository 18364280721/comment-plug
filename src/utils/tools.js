/**
 * @Description：评论组件化工具
 * @Author Silas
 * @date 2022/5/11
**/
import { commentStore } from '@/store'

const comment = commentStore()
// 时间转换
export function getTimer(date) {
  if (!date) return
  let minute = 1000 * 60;
  let hour = minute *60;
  let stringTime = date.replace(/[\-]/g,'/')
  let time1 = new Date().getTime(); // 当前的时间戳
  let time2 = Date.parse(new Date(stringTime)); // 指定时间的时间戳
  let year1 = new Date().getFullYear(); // 当前年份
  let year2 = new Date(stringTime).getFullYear(); // 指定时间的年份
  let month = new Date(stringTime).getMonth() + 1; // 指定时间的月份
  let day1 = new Date().getDate(); // 当前天
  let day2 = new Date(stringTime).getDate(); // 指定时间的天
  let time = time1 - time2;

  let result = null;
  if (time/hour > 48 && year1 === year2){ // 大于48小时且当年直接统计显示当前日期
    result = `${month}月${day2}日`
  } else if (time/hour > 24 && time/hour <= 48) { // 大于24小时又小于48小时 属于昨天就显示“昨天”，属于前天就显示前天
    result = day1 - day2 === 2 ? '前天' : '昨天'
  } else if (time/hour >= 1 && time/hour <= 24 ) { // 1小时到24小时内
    result = Math.ceil(time/hour) + "小时前";
  } else if (time/minute >= 2 && time/minute < 60) { // 120秒到1小时内
    result = Math.ceil(time/minute) + "分钟前";
  } else if ((time/minute >= 0 && time/minute < 2) || time < 0) { // 发布后的前120秒，都显示1分钟前
    result = "1分钟前";
  } else { // 超过当年显示n年n月n日
    result = `${year2}年${month}月${day2}日`
  }
  return result
}

// 定义全局 bizCode 为java微服务提供使用
export function getBizCode() {
  return {
    success: '200'
  }
}

// 十六进制颜色值的正则表达式
export function colorRgba (sHex, alpha = 1){
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  if (!sHex) {
    return;
  }
  let sColor = sHex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //  处理六位的颜色值
    var sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    // return sColorChange.join(',')
    // 或
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  } else {
    return sColor
  }
}

// 成长值与福豆发放提示
// 1 成长值+福豆成功  2 成长值+福豆失败 3 只有成长值 4 只有福豆 5 都没有
// growthEanble 评论是否有成长值 funType 0 点赞 1 评论
export function getMessageTips(growth, fudou, growthEanble, funType) {
  const fudouTip = {
    zh_CN: '发放失败，请联系系统管理员并提供错误代码',
    en_US: ' distribution failed. Please contact the system administrator and provide the error code: ',
    zh_TW: '發放失敗，請聯系系統管理員並提供錯誤代碼：'
  }
  const commontSuccess = {
    zh_CN: '评论成功',
    en_US: 'The comment was successful',
    zh_TW: '評論成功'
  }
  const likeSuccess = {
    zh_CN: '点赞成功',
    en_US: 'Like success',
    zh_TW: '點讚成功'
  }
  const language = comment.plugLanguage
  const scenario = comment.plugApplicationScenario
  /**
   * fuDouSendResult
   * needSendFuDou needSendFuDou
   * result  发放结果 1：成功  0：失败
   * code 福豆发放返回码  0：成功  其他：失败
   * amount  福豆发放数量
   * name 福豆名字
   */
  /**
   * growthValue
   * state  是否发成长值
   * count  发放数量
   * name  名字
   */
  // 成长值 + 福豆
  if (growth && growth.state && fudou && fudou.needSendFuDou && ((funType === 1 && growthEanble) || funType === 0)) {
    if (+fudou.result) {
      return {
        num: 1,
        type: 'success',
        tips: `${funType ? commontSuccess[language] : likeSuccess[language]}，${growth.name}+${growth.count}， ${fudou.name}+${fudou.amount}`
      }
    } else {
      return {
        num: 2,
        type: 'success',
        tips: `${funType ? commontSuccess[language] : likeSuccess[language]}，${growth.name}+${growth.count}`,
        typeTwo: scenario === 'web' ? 'error' : 'fail',
        tipsTwo: `${fudou.name}${fudouTip[language]}：${fudou.code}`
      }
    }
  }
  // 只有成长值
  if (growth && growth.state && ((funType === 1 && growthEanble) || funType === 0)) {
    return {
      num: 3,
      type: 'success',
      tips: `${funType ? commontSuccess[language] : likeSuccess[language]}，${growth.name}+${growth.count}`
    }
  }
  // 只有福豆
  if (fudou && fudou.needSendFuDou) {
    if (+fudou.result) {
      return {
        num: 4,
        type: 'success',
        tips: `${funType ? commontSuccess[language] : likeSuccess[language]}，${fudou.name}+${fudou.amount}`
      }
    } else {
      return {
        num: 4,
        type: scenario === 'web' ? 'error' : 'fail',
        tips: `${funType ? commontSuccess[language] : likeSuccess[language]}，${fudou.name}${fudouTip[language]}：${fudou.code}`
      }
    }
  }
  return {
    num: 5,
    type: 'success',
    tips: funType ? commontSuccess[language] : likeSuccess[language]
  }
}