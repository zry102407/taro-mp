const utils = {
    storage: {
      get: (key) => {
        return JSON.parse(localStorage.getItem(key) || '{}')
      },
      set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
      }
    }
}

export default utils;

export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
export const logError = (name, action, info?) => {
    if (!info) {
        info = 'empty'
    }
    try {
        let deviceInfo = wx.getSystemInfoSync()
        var device = JSON.stringify(deviceInfo)
    } catch (e) {
        console.error('not support getSystemInfoSync api', err.message)
    }
    let time = formatTime(new Date())
    console.error(time, name, action, info, device)
    // if (typeof action !== 'object') {
    // fundebug.notify(name, action, info)
    // }
    // fundebug.notifyError(info, { name, action, device, time })
    if (typeof info === 'object') {
        info = JSON.stringify(info)
    }
}
