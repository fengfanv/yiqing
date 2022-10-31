//请求数据
const http = require('http');
const https = require('https');
const querystring = require('querystring');
//获取当前时间
function format(num) {
    function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(num);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
exports.get = (option, params, callback) => {
    var _option = option;
    if (_option.protocol === "http:") {
        let request = http.request(_option, (response) => {
            var data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                //callback && callback(true, JSON.parse(data))
                callback && callback(true, data)
            });
        });
        request.on('error', function (err) {
            console.log(format(Date.now()), option.path, '请求出错！');
            console.log(err);
            callback && callback(false, {})
        });
        request.write(querystring.stringify(params))
        request.end();
    } else {
        let request = https.request(_option, (response) => {
            var data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                //callback && callback(true, JSON.parse(data))
                callback && callback(true, data)
            });
        });
        request.on('error', function (err) {
            console.log(format(Date.now()), option.path, '请求出错！');
            console.log(err);
            callback && callback(false, {})
        });
        request.write(querystring.stringify(params))
        request.end();
    }

}