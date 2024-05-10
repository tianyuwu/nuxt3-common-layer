import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import _ from 'lodash'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)

/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时前
 * @params stringTime: 年-月-日 时:分:秒
 */
export function friendlyFormatTime(stringTime: any) {
  let result = ''
  if (!stringTime) {
    result = '-'
    return result
  }
  const _time = stringTime.replace(/-/g, '/')
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365
  const time1 = new Date().getTime() // 当前的时间戳
  const time2 = new Date(_time).getTime()
  const time = _.cloneDeep(time1 - time2)

  if (time < 0)
    result = _time

  else if (time / year >= 1)
    result = `${parseInt(`${time / year}`)}年前`

  else if (time / month >= 1)
    result = `${parseInt(`${time / month}`)}个月前`

  else if (time / week >= 1)
    result = `${parseInt(`${time / week}`)}周前`

  else if (time / day >= 1)
    result = `${parseInt(`${time / day}`)}天前`

  else if (time / hour >= 1)
    result = `${parseInt(`${time / hour}`)}小时前`

  else if (time / minute >= 1)
    result = `${parseInt(`${time / minute}`)}分钟前`

  else
    result = '刚刚'

  return result
}

export function friendlyFormatAuditionTime(stringTime: any) {
  if (!stringTime)
    return '-'
  const _time = stringTime.replace(/-/g, '/')
  if (dayjs(_time).isToday())
    return `今天 ${dayjs(_time).format('HH')}:${dayjs(_time).format('mm')}`

  else if (dayjs(_time).isTomorrow())
    return `明天 ${dayjs(_time).format('HH')}:${dayjs(_time).format('mm')}`

  else
    return dayjs(_time).format('YYYY-MM-DD HH:mm')
}

export function friendlyFormatSystemTime() {
  if (dayjs().hour() >= 5 && dayjs().hour() < 12)
    return '早上'

  else if (dayjs().hour() >= 12 && dayjs().hour() < 14)
    return '中午'

  else if (dayjs().hour() >= 14 && dayjs().hour() < 18)
    return '下午'

  else
    return '晚上'
}

/**
 * 获取当月月初第一天的日期
 */
export function getStartOfMonth() {
  return dayjs().startOf('month').format('YYYY-MM-DD')
}

/**
 * 获取昨天的日期
 */
export function getYesterday() {
  return dayjs().add(-1, 'days').format('YYYY-MM-DD')
}

/**
 * 获取今天天的日期
 */
export function getToday() {
  return dayjs().format('YYYY-MM-DD')
}

/**
 * 比较一天之中的两个时刻  格式 11:00 12:00
 */
export function patchTimeInToday(t1: string, t2: string) {
  const date = new Date()
  const ft1 = date.setHours(+t1.split(':')[0], +t1.split(':')[1])
  const ft2 = date.setHours(+t2.split(':')[0], +t2.split(':')[1])
  return ft1 > ft2
}

/** 格式化显示日期 */
export function formatDatetime(datetimeStr: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(datetimeStr).format(format)
}


/**
 * Timestamp converted to how long ago format
 * @param timeString  just like this: 2023-07-12T01:11:28.916546+00:00'
 */
export const calcTimeAgo = (timeString: string) => {
  let timestamp = new Date(timeString).getTime();
  const now = new Date().getTime();
  const diff = now - timestamp;
  const oneMinute = 60 * 1000;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  let result;
  if (diff < oneMinute) {
    return '1分钟前';
  } else if (diff < oneHour) {
    result = Math.floor(diff / oneMinute);
    return result > 1 ? `${result}分钟前` : '1分钟前';
  } else if (diff < oneDay) {
    result = Math.floor(diff / oneHour);
    return result > 1 ? `${result}小时前` : '1小时前';
  } else if (diff < oneDay * 2) {
    result = Math.floor(diff / oneDay);
    return result > 1 ? `${result}天前` : '1天前';
  } else {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedTime;
  }
};