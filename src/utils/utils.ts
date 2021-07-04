const utils = {
  storage: {
    get: key => {
      if (localStorage) {
        return localStorage.getItem(key)
          ? JSON.parse(localStorage.getItem(key))
          : "";
      } else if (wx && wx.getStorageSync) {
        return wx.getStorageSync(key)
      }
    },
    set: (key, value) => {
      if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      } else if (wx && wx.setStorageSync) {
        wx.setStorageSync(key, JSON.stringify(data));
      }
    },
    removeItem: key => {
      if (localStorage) {
        localStorage.removeItem(key);
      } else if (wx && wx.removeStorageSync) {
        wx.removeStorageSync(key);
      }
    }
  }
};

export default utils;

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
export const logError = (name, action, info?) => {
  if (!info) {
    info = "empty";
  }
  try {
    let deviceInfo = wx.getSystemInfoSync();
    var device = JSON.stringify(deviceInfo);
  } catch (e) {
    console.error("not support getSystemInfoSync api", e.message);
  }
  let time = formatTime(new Date());
  console.error(time, name, action, info, device);
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === "object") {
    info = JSON.stringify(info);
  }
};

export const theme = '#fe7646'
