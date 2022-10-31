var fs = require("fs");
//处理疫情城市坐标数据的
fs.readFile('map.json', 'utf8', function (err, data) {
    if (err) console.log(err);
    var data = JSON.parse(data);
    var city = {
        "美国":[-95.665173,37.156536],
        "日本本土":[138.254649,36.209716],
        "钻石号邮轮":[139.835193,35.573974],
        "新加坡":[103.866979,1.360474],
        "泰国":[100.99829,15.876988],
        "韩国":[127.754849,35.907991],
        "澳大利亚":[133.8493,-25.256884],
        "马来西亚":[102.006236,4.203268],
        "德国":[10.480847,51.15647],
        "越南":[108.33699,14.069269],
        "法国":[2.264917,46.227036],
        "加拿大":[-106.336423,56.10997],
        "阿联酋":[53.822522,23.414791],
        "菲律宾":[121.774592,12.828667],
        "英国":[-3.429074,55.359878],
        "印度":[78.938734,20.583126],
        "俄罗斯":[105.302658,61.528214],
        "斯里兰卡":[80.746501,7.872767],
        "西班牙":[-3.713575,40.43358],
        "柬埔寨":[105.00821,12.60154],
        "芬兰":[25.730904,61.929931],
        "比利时":[4.44464,50.454909],
        "尼泊尔":[84.100716,28.332235],
        "瑞典":[18.659599,60.107176],
        "意大利":[12.49839,41.891489],
        "伊朗":[53.663325,32.44863],
        "黎巴嫩":[35.847337,33.85592],
        "以色列":[34.871159,31.103704],

        "恩施州":[109.491143,30.286422],
        "安阳市":[114.398353,36.10454],
        "漯河市":[114.023419,33.588191],
        "湘西自治州":[114.023419,33.588191],
        "甘孜州":[101.968547,30.055279],
        "凉山州":[102.272415,27.888538],
        "阿坝州":[101.521135,27.429253],
        "大兴安岭":[124.150627,50.420761],
        "西双版纳":[100.801143,22.019498],
        "大理":[100.263804,25.596015],
        "红河州":[100.282436,25.578596],
        "德宏州":[98.580588,24.433427],
        "楚雄州":[101.543103,25.048983],
        "文山州":[104.253973,23.374841],
        "琼海市":[110.479395,19.264254],
        "昌江":[109.060164,19.278885],
        "东方市":[108.656267,19.101652],
        "黔南州":[107.545646,26.250181],
        "黔东南州":[107.985423,26.584018],
        "黔西南州":[104.91134,25.099204],
        "临夏":[103.21524,35.602397],
        "甘南州":[103.224439,35.59958],
        "延边州":[129.522117,42.91337],
        "公主岭":[124.820826,43.508321],
        "伊犁州":[81.325943,43.923553],
        "昌吉州":[87.30688,44.015801],
        "海北州":[100.891022,36.946706],
        "台湾":[120.656973,24.171104],
        "澳门":[120.656973,24.171104],
        "香港":[114.171177,22.282885],
    };
    var count = 0;
    if (data.districts) {
        var china = data.districts[0];
        var province = china.districts;
        var arr = [];
        var alen = province.length;
        for (var a = 0; a < alen; a++) {
            var brr = [];//存地级市的数组
            var bcity = province[a].districts;
            var blen = province[a].districts.length;//地级市

            console.log('省份-------------------------------------' + province[a].name);
            if (province[a].name == "香港特别行政区" || province[a].name == "澳门特别行政区" || province[a].name == "台湾省") {
                continue;
            }

            for (var b = 0; b < blen; b++) {
                //处理市的地级市
                var crr = [];//存区/县的数组
                var ccounty = bcity[b].districts;
                var clen = ccounty.length;


                //console.log('地级市----'+bcity[b].name+'----坐标'+bcity[b].center);
                var cityName = bcity[b].name.replace(/(市|城区)/, "");
                var cityPosition = bcity[b].center.split(",");
                var cityArr = [];
                cityArr[0] = parseFloat(cityPosition[0]);
                cityArr[1] = parseFloat(cityPosition[1]);
                count++;
                city[cityName] = cityArr;


                // for (var c = 0; c < clen; c++) {
                //处理县
                //     var cobj = { "name": ccounty[c].name, "children": [], "level": "county" };
                //     crr.push(cobj);
                // }

                //var bobj = { "name": bcity[b].name, "children": crr, "level": "city" }
                //brr.push(bobj)
            }
            //var aobj = { "name": province[a].name, "children": brr, "level": "province" };
            //arr.push(aobj)
        }
        console.log(city);
        console.log(count);

        fs.writeFile("newCityZuoBiao.json", JSON.stringify(city), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("保存成功！");
        });

        //console.log(JSON.stringify(arr));
    }


});

// fs.writeFile(path + "test.txt", "hello world!", function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// });
