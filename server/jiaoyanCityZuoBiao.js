var fs = require("fs");
var request = require('./request');
//校验城市数据，看处理出来的疫情数据还有那个城市没有坐标
//获取城市疫情数据
//var dataList = getFiles(['cityyiqing.json','newJson.json'])

//console.log(dataList);

//校验程序
// fs.readFile('cityyiqing.json', 'utf8', function (err1, data1) {
//     if (err1) console.log(err1);
//     var data1 = JSON.parse(data1);
//     //console.log(data1);
//     fs.readFile('newJson.json', 'utf8', function (err2, data2) {
//         if (err2) console.log(err2);
//         var data2 = JSON.parse(data2);
//         //console.log(data2);
//         var data1Len = data1.length;
//         for(var i=0;i<data1Len;i++){
//             if(data2[data1[i].name] != undefined){
//                 //console.log(data1[i].name);
//             }else{
//                 console.log(data1[i].name+': 没有地址数据')
//             }
//         }
//     });
// });

request.get({
    "hostname": "www.kangyupeng.cn",
    "protocol": "http:",
    "port": 8080,
    "method": "GET",
    "path": "/api/yq"
}, {}, function (state, data) {
    if (state) {
        var Ddata = JSON.parse(data);
        fs.readFile('newJson.json', 'utf8', function (err, data2) {
            if (err) console.log(err);
            var data2 = JSON.parse(data2);//城市坐标数据
            console.log('开始校验国内数据');
            Ddata.guoneiData.mapData.forEach((element, index) => {
                if (data2[element.name] != undefined) {
                    //有城市数据
                } else {
                    console.log(element.name + ': 没有地址数据')
                }
            });
            console.log('开始校验国外数据');
            Ddata.guowaiData.mapData.forEach((element, index) => {
                if (data2[element.name] != undefined) {
                    //有城市数据
                } else {
                    console.log(element.name + ': 没有地址数据')
                }
            });
        });
    }
});



// function getFiles(FilesName){
//     var ffffarr = [];
//     FilesName.forEach((index,item) => {
//         fs.readFile(index, 'utf8', function (err, data) {
//             if (err) console.log(err);
//             var data = JSON.parse(data);
//             ffffarr.push(data)
//         });
//     });
//     return ffffarr;
// }