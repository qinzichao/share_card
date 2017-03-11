
//对外公开的方法
module.exports.postData = postData;

//远程调用
function postData(remote_api_url, remote_data, cb) {

  console.log("postData请求的地址：", remote_api_url);

  console.log("postData提交的数据：", remote_data);

  wx.request({

    url: remote_api_url,
    data: remote_data,
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },

    success: function (res) {
      console.log("postData返回的数据：", res);

      //如果有回调， 则回调
      if (cb && typeof cb == "function") {
        cb(res)
      }
      else {
        console.log("postData没有传入对应的回调方法");
      }
    },

    fail: function (res) {
      console.log('postData请求失败：', res);
    }

  });
}
