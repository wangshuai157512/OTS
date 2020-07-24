const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const paperTime = date => {
  let minute =  Math.floor(date / 60)
  let second =  Math.floor(date % 60)
  return `${minute < 10?'0'+minute:minute}:${second < 10? '0'+second:second}`
}

export default{
  formatTime,
  paperTime
}
