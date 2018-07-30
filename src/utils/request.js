import { baseUrl } from './MXConfig';
// require('./bluebird.min');
// console.log("sdf");

const app = getApp()
export function request(method, url, parameter, token) {
  console.log("token");
  console.log(token);
  return new Promise(function (resolve, reject) {
    var header = {
      "Content-Type": 'application/json',
        'x-auth-token': token
    }
    wx.request({
      url: baseUrl + url,
      data: parameter,
      header: header,
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
          var res_ = res.data
          resolve(res_);
          if (res.statusCode === 403) {
            wx.navigateTo({
              url: '/pages/bindphone/bindphone',
            })
          }
      },
      fail: function (res) {
        // 做特殊处理
        reject(res)
        wx.hideLoading()
      },
      complete: function (res) {

      }
    })
  });
}
