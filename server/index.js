var http = require('http');
var https = require('https');
var fs = require('fs');
var querystring = require('querystring');

//获取数据
function getApiData(option, params, callback) {
	var _option = option;
	var request = https.request(_option, (response) => {
		var data = '';
		response.on('data', function (chunk) {
			data += chunk;
		});
		response.on('end', function () {
			callback && callback(true, JSON.parse(data))
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

// getApiData({
// 	"hostname": "tianqiapi.com",
// 	"protocol": "https:",
// 	"port": 443,
// 	"method": "GET",
// 	"path": "https://tianqiapi.com/api?version=epidemic&appid=25151648&appsecret=w05RudbO",
// 	// "headers": {
// 	// 	"host": "tianqiapi.com",
// 	// 	"origin": "https://tianqiapi.com",
// 	// 	"referer": "https://tianqiapi.com/api",
// 	// 	//"userAgent": "Mozilla/5.0 (Windows NT 10.0; …) Gecko/20100101 Firefox/73.0"
// 	// }
// }, {}, function (state, data) {
// 	if (state) {
// 		//请求成功，更新数据
// 		if (data.data == undefined) {
// 			console.log('请求成功！但是是undefined');
// 			console.log(data);
// 		} else {

// 			console.log('请求成功了');
// 			console.log(data);

// 		}
// 	}
// });


// getApiData({
// 	"hostname": "view.inews.qq.com",
// 	"protocol": "https:",
// 	"port": 443,
// 	"method": "GET",
// 	"path": "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
// 	// "headers": {
// 	// 	"Host": "view.inews.qq.com",
// 	// 	"Origin": "https://view.inews.qq.com",
// 	// 	"Referer": "https://view.inews.qq.com/g2/getOnsInfo",
// 	// 	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; …) Gecko/20100101 Firefox/73.0"
// 	// }
// }, {}, function (state, data) {
// 	if (state) {
// 		//请求成功，更新数据
// 		if (data.data == undefined) {
// 			console.log('请求成功！但是是undefined');
// 			console.log(data);
// 		} else {

// 			console.log(data);

// 		}
// 	}
// });




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
//console.log(format(Date.now()));


//天行数据
//https://tianqiapi.com/api?version=epidemic&appid=25151648&appsecret=w05RudbO

//腾讯数据
//https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5

//var indexData = {}; //首页数据
var guoneiData = {}; //国内数据
var guowaiData = {}; //国外数据
var shishiData = {}; //实时数据

var cityZb = {};//城市坐标数据

function daoXunArr(arr) {
	//数组倒叙
	var newArr = [];
	var arrLen = arr.length - 1;
	for (var i = 0; i <= arrLen; i++) {
		newArr[i] = arr[arrLen - i];
	}
	return newArr
}

//提取实时新闻数据----国内图表和实时新闻
function tiQu_shishi() {
	console.log('开始使用腾讯新闻数据');
	fs.readFile(__dirname + '/public/newTengxunNews.json', 'utf8', function (err, newTengxunNewsData) {
		if (err) {
			console.log('提取腾讯新闻数据，读取文件失败！')
		}
		var data2 = JSON.parse(JSON.parse(newTengxunNewsData).data) //天气api数据
		//开始提取实时新闻数据
		//提取实时动态start
		console.log('使用腾讯新闻数据-提取实时动态');
		var shishiList = [];
		var newsArr = data2.articleList;
		//console.log(data2)
		newsArr.forEach((item, index) => {
			shishiList.push({
				"id": item.cmsId, //新闻id
				"title": item.title, //标题
				"media": item.media, //媒体
				"date": item.publish_time, //时间
				"content": item.desc, //内容
				"url": item.url //新闻地址
			})
		});
		shishiData.list = shishiList;

		//处理国内图表数据start
		console.log('使用腾讯新闻数据-提取国内图表数据');
		var tubiaoObj = {};
		//curesNum  治愈人数
		//deathsNum 死亡人数
		//confirmedNum 确证人数
		//suspectedNum 疑似人数
		//date      当天时间
		//var historyArr = daoXunArr(data2.chinaDayList); //倒叙Arr
		var historyArr = data2.chinaDayList;
		var dataTypeColor = ['#e10000', '#ffa352', '#34aa70', '#333'];
		var dataType = ["确证", "疑似", "治愈", "死亡"];
		var dataTypeKey = ["confirm", "suspect", "heal", "dead"];
		var dataTypeLen = dataType.length;
		var len = historyArr.length;
		var xArr = []; //x轴坐标
		var shujuArr = []; //每个类型的数据
		for (var i = 0; i < len; i++) {
			xArr.push(historyArr[i].date);
			for (var j = 0; j < dataTypeLen; j++) {
				if (shujuArr[j] == undefined) {
					//没有则创建
					shujuArr[j] = {
						"name": dataType[j],
						"type": 'line',
						"areaStyle": {},
						"smooth": true,
						"label": {
							normal: {
								show: false, //是否显示总表标数据
								position: 'top'
							}
						},
						itemStyle: {
							color: dataTypeColor[j]
						},
						data: [historyArr[i][dataTypeKey[j]]] //注入数据
					};
				} else {
					//有则直接存数据
					shujuArr[j].data[i] = historyArr[i][dataTypeKey[j]];
				}
			}
		}
		tubiaoObj.dataTypeColor = dataTypeColor;
		tubiaoObj.dataType = dataType;
		tubiaoObj.xArr = xArr;
		tubiaoObj.shujuArr = shujuArr;
		guoneiData.tableData = tubiaoObj;
		//console.log(tubiaoObj);
		//处理国内图表数据end
	});
}


//请求实时新闻数据
function getTengXunNews() {
	console.log("开始请求腾讯新闻数据");
	getApiData({
		"hostname": "view.inews.qq.com",
		"protocol": "https:",
		"port": 443,
		"method": "GET",
		"path": "https://view.inews.qq.com/g2/getOnsInfo?name=disease_other",
		// "headers": {
		// 	"Host": "view.inews.qq.com",
		// 	"Origin": "https://view.inews.qq.com",
		// 	"Referer": "https://view.inews.qq.com/g2/getOnsInfo",
		// 	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; …) Gecko/20100101 Firefox/73.0"
		// }
	}, {}, function (state, data) {
		if (state) {
			//请求成功，更新数据
			if (data.data == undefined) {
				console.log('请求腾旭新闻数据成功！但是是undefined');
				console.log(data)
				return false;
			} else {
				//1、备份旧数据，存储新数据
				fs.readFile(__dirname + '/public/newTengxunNews.json', 'utf8', function (err, newTengxunNewsData) {
					if (err) {
						//没有旧数据或读写出错直接创建新文件存储数据
						fs.writeFile(__dirname + '/public/newTengxunNews.json', JSON.stringify(data), function (err2) {
							if (err2) {
								return console.log("newTengxunNews没有旧数据，创建文件和保存数据失败！");
							}
							console.log("newTengxunNews没有旧数据，创建文件和保存数据成功！");
							//提取实时和历时疫情数据
							tiQu_shishi();
						});
					} else {
						//有旧数据，创建备份文件，把数据拷贝进去
						fs.writeFile(__dirname + '/public/' + Date.now() + '-tengxunNews.json', newTengxunNewsData, function (err2) {
							if (err2) {
								return console.log("newTengxunNews有旧数据，备份旧数据失败！");
							}
							console.log("newTianqi有旧数据，备份旧数据成功！");
							fs.writeFile(__dirname + '/public/newTengxunNews.json', JSON.stringify(data), function (err3) {
								if (err3) {
									return console.log("newTengxunNews有旧数据，写入新数据失败！");
								}
								console.log("newTengxunNews有旧数据，写入新数据成功！");
								//提取实时和历时疫情数据
								tiQu_shishi();
							});
						});
					}
				});
				// var newsData = JSON.parse(data.data);
				// console.log('腾讯实时新闻数据start')
				// console.log(newsData);
				// console.log('腾讯实时新闻数据end')
			}
		}

		//实时新闻请求完毕后请求腾讯国外数据
		get_tengxunNews_guowai()
	});

}
//请求腾讯新闻-国外数据
//https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign
function get_tengxunNews_guowai() {
	console.log("开始请求腾讯新闻-国外-数据");
	getApiData({
		"hostname": "view.inews.qq.com",
		"protocol": "https:",
		"port": 443,
		"method": "GET",
		"path": "https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign"
	}, {}, function (state, data) {
		if (state) {
			//请求成功，更新数据
			if (data.data == undefined) {
				console.log('请求腾讯新闻-国外-数据成功！但是是undefined');
				console.log(data);
				return false;
			} else {
				//1、备份旧数据，存储新数据
				fs.readFile(__dirname + '/public/newTengxunNews_guowai.json', 'utf8', function (err, newTengxunNewsData_guowai) {
					if (err) {
						//没有旧数据或读写出错直接创建新文件存储数据
						fs.writeFile(__dirname + '/public/newTengxunNews_guowai.json', JSON.stringify(data), function (err2) {
							if (err2) {
								return console.log("newTengxunNews_guowai没有旧数据，创建文件和保存数据失败！");
							}
							console.log("newTengxunNews_guowai没有旧数据，创建文件和保存数据成功！");
							//提取腾讯新闻国外数据
							tiQu_guowai();
						});
					} else {
						//有旧数据，创建备份文件，把数据拷贝进去
						fs.writeFile(__dirname + '/public/' + Date.now() + '-tengxunNews_guowai.json', newTengxunNewsData_guowai, function (err2) {
							if (err2) {
								return console.log("newTengxunNews_guowai有旧数据，备份旧数据失败！");
							}
							console.log("newTianqi有旧数据，备份旧数据成功！");
							fs.writeFile(__dirname + '/public/newTengxunNews_guowai.json', JSON.stringify(data), function (err3) {
								if (err3) {
									return console.log("newTengxunNews_guowai有旧数据，写入新数据失败！");
								}
								console.log("newTengxunNews_guowai有旧数据，写入新数据成功！");
								//提取腾讯新闻国外数据
								tiQu_guowai();
							});
						});
					}
				});
			}
		}
	});
}

//最新提取国外数据
function tiQu_guowai() {
	//newTengxunNews_guowai
	console.log('开始使用国外数据');
	fs.readFile(__dirname + '/public/newTengxunNews_guowai.json', 'utf8', function (err, newTengxunNews_guowaiData) {
		if (err) {
			console.log('提取腾讯国外数据，读取文件失败！');
			return false;
		}
		var data2 = JSON.parse(JSON.parse(newTengxunNews_guowaiData).data)




		//国外地图数据start,国外图表数据start
		console.log('使用腾讯数据-提取国外图表数据');
		var list = data2.foreignList;
		var len = list.length;
		var mapArr = [];
		for (var i = 0; i < len; i++) {
			if (list[i].name == "中国") {
				continue;
			}
			mapArr.push({
				"name": list[i].name,
				"value": list[i].confirm
			})
			//console.log(list[i].name + " : " + list[i].total.confirm);
			//console.log(list[i].total.confirm);
		}
		guowaiData.mapData = mapArr;
		mapArr = [];
		list = null;
		len = null;
		//国外地图数据end,国外图表数据end


		//处理国外列表数据start
		console.log('使用腾讯数据-提取国外列表数据');
		var area = data2.foreignList;
		var newArr = [];
		area.forEach((item, index) => {
			var obj = {
				"name": item.name,
				"isShowChild": false, //是否显示子列表
				"aNum": item.confirm, //确诊
				"cNum": item.heal, //治愈
				"dNum": item.dead, //死亡
				"child": []
			}
			if (item.children) {
				var arr = [];
				item.children.forEach((item2, index2) => {
					var obj2 = {
						"name": item2.name,
						"aNum": item2.confirm, //确诊
						"cNum": item2.heal, //治愈
						"dNum": item2.dead, //死亡
					}
					arr.push(obj2)
				})
				obj.child = arr;
			}
			newArr.push(obj)
		})
		guowaiData.listData = newArr;
		//处理国外列表数据end


		//提取国外首页数据start
		console.log('使用腾讯数据-提取国外首页数据!');
		var guoWeIndexData = {};
		guoWeIndexData.nowdiagnosed = data2.globalStatis.nowConfirm || 0; //现有确诊人数
		guoWeIndexData.diagnosed = data2.globalStatis.confirm || 0; //确诊人数
		guoWeIndexData.cured = data2.globalStatis.heal || 0; //治愈人数
		guoWeIndexData.death = data2.globalStatis.dead || 0; //死亡人数

		guoWeIndexData.nowdiagnosedIncr = data2.globalStatis.nowConfirmAdd || 0; //现有确诊人数增加
		guoWeIndexData.diagnosedIncr = data2.globalStatis.confirm || 0; //新增确证人数
		guoWeIndexData.curedIncr = data2.globalStatis.heal || 0; //新增治愈人数
		guoWeIndexData.deathIncr = data2.globalStatis.dead || 0; //新增死亡人数


		guowaiData.indexData = guoWeIndexData;
		//提取国外首页数据end



	})
}




function run() {

	//提取国外数据
	function tiQu_guonei() {
		console.log('开始使用腾讯数据');
		fs.readFile(__dirname + '/public/newTengxun.json', 'utf8', function (err, newTengxunData) {
			if (err) {
				console.log('提取腾讯数据，读取文件失败！')
				return false;
			}
			var data2 = JSON.parse(JSON.parse(newTengxunData).data) //腾讯api数据
			//console.log(data2)

			//处理国内地图数据start
			console.log('使用腾讯数据-提取国内地图数据');
			var GNmapArr = [];
			var area = data2.areaTree;
			area.forEach((item, index) => {
				if (item.name == "中国") {
					var provinceArr = item.children;
					var provinceArrLen = provinceArr.length;
					for (var i = 0; i < provinceArrLen; i++) {
						if (provinceArr[i].name.search("(天津|北京|上海|重庆|香港|澳门|台湾)") != -1) {
							//console.log(provinceArr[i].name + "确诊：" + provinceArr[i].total.confirm);
							GNmapArr.push({
								"name": provinceArr[i].name,
								"value": provinceArr[i].total.confirm
							})
							continue;
						}
						if (provinceArr[i].children) {
							var cityList = provinceArr[i].children;
							var cityListLen = cityList.length;
							for (var j = 0; j < cityListLen; j++) {
								//输出市
								//console.log(cityList[j].name + "确诊：" + cityList[j].total.confirm);
								GNmapArr.push({
									"name": cityList[j].name,
									"value": cityList[j].total.confirm
								})
							}
						}
					}
				}
			});
			guoneiData.mapData = GNmapArr;
			//处理国内地图数据end


			//处理国内列表数据start
			console.log("使用腾讯数据-提取国内列表数据");
			var GNlistArr = [];
			area.forEach((countryItem, countryIndex) => {
				if (countryItem.name == "中国") {
					var provinceArr = countryItem.children;
					provinceArr.forEach((item, index) => {
						var obj = {
							"name": item.name,
							"isShowChild": false, //是否显示子列表
							"aNum": item.total.confirm, //确诊
							"cNum": item.total.heal, //治愈
							"dNum": item.total.dead, //死亡
							"child": []
						}
						if (item.children) {
							var arr = [];
							item.children.forEach((item2, index2) => {
								var obj2 = {
									"name": item2.name,
									"aNum": item2.total.confirm, //确诊
									"cNum": item2.total.heal, //治愈
									"dNum": item2.total.dead, //死亡
								}
								arr.push(obj2)
							})
							obj.child = arr;
						}
						GNlistArr.push(obj)
					});
				}
			})
			guoneiData.listData = GNlistArr;
			//处理国内列表数据end

			//提取国内首页数据start
			console.log('使用腾讯数据-提取国内首页数据!');
			var guoNeIndexData = {};
			guoNeIndexData.diagnosed = data2.chinaTotal.confirm || 0; //确诊人数
			guoNeIndexData.suspect = data2.chinaTotal.suspect || 0; //疑似人数
			guoNeIndexData.cured = data2.chinaTotal.heal || 0; //治愈人数
			guoNeIndexData.death = data2.chinaTotal.dead || 0; //死亡人数
			guoNeIndexData.serious = data2.chinaTotal.nowSevere || 0; //重症人数

			guoNeIndexData.diagnosedIncr = data2.chinaAdd.confirm || 0; //新增确证人数
			guoNeIndexData.suspectIncr = data2.chinaAdd.suspect || 0; //新增疑似人数
			guoNeIndexData.curedIncr = data2.chinaAdd.heal || 0; //新增治愈人数
			guoNeIndexData.deathIncr = data2.chinaAdd.dead || 0; //新增死亡人数
			guoNeIndexData.seriousIncr = data2.chinaAdd.nowSevere || 0; //新增重症人数

			guoNeIndexData.updataDate = data2.lastUpdateTime; //数据更新时间
			guoneiData.indexData = guoNeIndexData;
			//提取国内首页数据end
		});
	}

	function getTengxun() {
		console.log('开始请求腾讯数据');

		//请求腾讯数据_guonei
		getApiData({
			"hostname": "view.inews.qq.com",
			"protocol": "https:",
			"port": 443,
			"method": "GET",
			"path": "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
		}, {}, function (state, data) {
			if (state) {
				//请求成功，更新数据
				if (data.data == undefined) {
					console.log('请求腾讯数据成功！但是是undefined');
					console.log(data);
				} else {
					//数据没问题
					//1、备份旧数据，存储新数据
					fs.readFile(__dirname + '/public/newTengxun.json', 'utf8', function (err, newTengxunData) {
						if (err) {
							//没有旧数据或读写出错直接创建新文件存储数据
							fs.writeFile(__dirname + '/public/newTengxun.json', JSON.stringify(data), function (err2) {
								if (err2) {
									return console.log("newTengxun没有旧数据，创建文件和保存数据失败！");
								}
								console.log("newTengxun没有旧数据，创建文件和保存数据成功！");
								//提取国内数据
								tiQu_guonei();
							});
						} else {
							//有旧数据，创建备份文件，把数据拷贝进去
							fs.writeFile(__dirname + '/public/' + Date.now() + '-tengxun.json', newTengxunData, function (err2) {
								if (err2) {
									return console.log("newTengxun有旧数据，备份旧数据失败！");
								}
								console.log("newTianqi有旧数据，备份旧数据成功！");
								fs.writeFile(__dirname + '/public/newTengxun.json', JSON.stringify(data), function (err3) {
									if (err3) {
										return console.log("newTengxun有旧数据，写入新数据失败！");
									}
									console.log("newTengxun有旧数据，写入新数据成功！");
									//提取国内数据
									tiQu_guonei();
								});
							});
						}
					});
				}
			} else {
				//请求失败，使用旧数据并直接提取国内数据
				//提取国外数据
				tiQu_guonei();
			}
			//请求腾讯新闻数据
			getTengXunNews();
		});
	}


	//读取上一次更新时间，检查是否大于6个小时，如大于6个小时则更新，不大于则不更新直接提取数据
	fs.readFile(__dirname + '/public/update.json', 'utf8', function (Uperr, updata) {
		if (Uperr) {
			console.log('读取时间戳，读取失败！');
			return false;
		}
		var updata = JSON.parse(updata);
		if (Date.now() - updata.date > 3600000 * 6) {
			//需要更新数据，
			console.log("需要联网更新数据");
			//写入本次更新时间
			fs.writeFile(__dirname + '/public/update.json', JSON.stringify({
				"date": Date.now()
			}), function (updataErr) {
				if (updataErr) {
					return console.log('写入更新时间失败！');
				}
				console.log('写入更新时间成功！');


				//请求腾讯数据
				getTengxun();
			});

		} else {
			//不需要更新数据，直接提取数据
			console.log("不需要更新数据，直接提取数据");
			tiQu_guonei(); //国内
			tiQu_guowai(); //国外
			tiQu_shishi();//实时
		}
		//更新城市坐标数据
		fs.readFile(__dirname + '/public/newCityZuoBiao.json', 'utf8', function (cityZbErr, cityZbData) {
			if (cityZbErr) {
				console.log('读取城市坐标文件，读取失败！');
				return false;
			}
			console.log('更新城市坐标数据成功！');
			cityZb = JSON.parse(cityZbData);
		});
	});
}





//---------------------------------以下服务配置






run();
//定时更新数据程序，6小时更新一次
setInterval(function () {
	run();
}, (3600000 * 6));


http.createServer(function (request, response) {
	var ip = request.headers['x-forwarded-for'] || request.ip || request.connection.remoteAddress || request.socket.remoteAddress ||
		request.connection.socket.remoteAddress || '';
	if (ip.split(',').length > 0) {
		ip = ip.split(',')[0];
	}
	response.setHeader("Access-Control-Allow-Origin", "*");
	var path = request.url.split('?')[0];
	console.log('时间:' + format(Date.now()) + "; 请求地址:" + ip + "; 访问地址:" + path);
	if (path == '/api/gn') {
		//获取国内数据
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify(guoneiData));
	} else if (path == '/api/yq') {
		//获取首页数据index和国内数据guonei
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({
			"guoneiData": guoneiData,
			//"indexData": indexData,
			"guowaiData": guowaiData,
			"shishiData": shishiData,
			"cityZb": cityZb
		}));
	} else if (path === '/api/cityZb') {
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({
			"data": cityZb,
		}));
	} else {
		response.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		response.end('404');
	}
}).listen(8080);
console.log('启动成功！');
