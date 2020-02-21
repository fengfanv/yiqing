import React, { Component, Fragment } from 'react';

import store from '../store/index'

import request from '../request/index'

//import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import './index.css'

//import tengxunData from '../tengxun.json'

//引入子组件
import Guoneiyiqing from './GuoNeiYiQing'
import Guowaiyiqing from './GuoWaiYiQing'
import Shishidongtai from './ShiShiDongTai'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            xUrl: store.getState().xUrl,
            indexData: {
                diagnosed: 0,
                suspect: 0,
                cured: 0,
                death: 0,
                serious: 0,
                diagnosedIncr: 0,
                suspectIncr: 0,
                curedIncr: 0,
                deathIncr: 0,
                seriousIncr: 0,
                updataDate: '正在更新...'
            },
            isGuonei: true,
            isGuowai: false,
            isShishi: false
        }
        //Redux订阅模式
        this.storeChange = this.storeChange.bind(this)//转变this指向
        store.subscribe(this.storeChange)//订阅Redux的状态
        //this.myComponent = this.myComponent.bind(this,)

    }
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="header">
                        <img src={require('../images/header_img.webp')} alt="header_img" />
                        <div className="header_text header_top">
                            <h1>新型冠状病毒肺炎</h1>
                            <h2>疫情动态播报</h2>
                        </div>
                    </div>
                    {/* 更新时间 */}
                    <p className="update_time">更新时间:{this.state.indexData.updataDate}</p>
                    {/*全国 总数据汇总展示*/}
                    <ul className="total_list clearfix">
                        <li>
                            <p>确诊</p>
                            <h3 className="a_color">{this.state.indexData.diagnosed || 0}</h3>
                            <h4>较昨日<span className="a_color">+{this.state.indexData.diagnosedIncr || 0}</span></h4>
                        </li>
                        <li>
                            <p>疑似</p>
                            <h3 className="b_color">{this.state.indexData.suspect}</h3>
                            <h4>较昨日<span className="b_color">+{this.state.indexData.suspectIncr}</span></h4>
                        </li>
                        <li>
                            <p>治愈</p>
                            <h3 className="c_color">{this.state.indexData.cured}</h3>
                            <h4>较昨日<span className="c_color">+{this.state.indexData.curedIncr}</span></h4>
                        </li>
                        <li>
                            <p>重症</p>
                            <h3 className="e_color">{this.state.indexData.serious}</h3>
                            <h4>较昨日<span className="e_color">+{this.state.indexData.seriousIncr}</span></h4>
                        </li>
                        <li>
                            <p>死亡</p>
                            <h3 className="d_color">{this.state.indexData.death}</h3>
                            <h4>较昨日<span className="d_color">+{this.state.indexData.deathIncr}</span></h4>
                        </li>
                    </ul>
                    {/* 病毒名称和防治措施 */}
                    <div className="board">
                        <p><span style={{"fontWeight":"bold"}}>病毒</span> : 新型冠状病毒 SARS-CoV-2</p>
                        <p><span style={{"fontWeight":"bold"}}>传播途径</span> : 飞沫传播、接触传播;粪口传播和气溶胶传播尚待确认</p>
                    </div>
                    {/* 菜单 */}
                    {/* <Router> */}
                    <ul className="nav clearfix">
                        <li className={this.state.isGuonei ? "nav_hover" : ""} onClick={this.setNav.bind(this, 'isGuonei')}>
                            {/* <Link to="/yq">
                                    <p>国内疫情</p>
                                    <span></span>
                                </Link> */}
                            <p>国内疫情</p>
                            <span></span>
                        </li>
                        <li className={this.state.isGuowai ? "nav_hover" : ""} onClick={this.setNav.bind(this, 'isGuowai')}>
                            {/* <Link to="/yq/guowai">
                                    <p>国外疫情</p>
                                    <span></span>
                                </Link> */}
                            <p>国外疫情</p>
                            <span></span>
                        </li>
                        <li className={this.state.isShishi ? "nav_hover" : ""} onClick={this.setNav.bind(this, 'isShishi')}>
                            {/* <Link to="/yq/shishi">
                                    <p>实时动态</p>
                                    <span></span>
                                </Link> */}
                            <p>实时动态</p>
                            <span></span>
                        </li>
                    </ul>
                    {/* 分页内容 */}
                    {/* <div className="nav_page">
                            <Redirect to="/yq"></Redirect>
                            <Route exact path="/yq" component={guoneiyiqing} />
                            <Route exact path="/yq/guowai" component={guowaiyiqing} />
                            <Route exact path="/yq/shishi" component={shishidongtai} />
                        </div> */}
                    {/* </Router> */}
                    <div className="nav_page">

                        {/* {this.myComponent.bind(this,true)} */}
                        {
                            // (function(isShow){
                            //     if(isShow){
                            //         return <Guoneiyiqing />
                            //     }else{
                            //         return null;
                            //     }
                            // })(this.state.isGuonei)
                        }
                        {this.state.isGuonei ? <Guoneiyiqing isShow={true} /> : null}
                        {this.state.isGuowai ? <Guowaiyiqing isShow={true} /> : null}
                        {this.state.isShishi ? <Shishidongtai isShow={true} /> : null}
                        {/* <Guoneiyiqing isShow={this.state.isGuonei} style={this.state.isGuonei ? { "display": "block" } : { "display": "none" }} />
                        <Guowaiyiqing isShow={this.state.isGuowai} style={this.state.isGuowai ? { "display": "block" } : { "display": "none" }} />
                        <Shishidongtai isShow={this.state.isShishi} style={this.state.isShishi ? { "display": "block" } : { "display": "none" }} /> */}
                    </div>
                </div>
            </Fragment>
        )
    }
    // myComponent(isShow){
    //     console.log('111112222233333');
    //     if(isShow){
    //         return <Guoneiyiqing />
    //     }else{
    //         return <p>哈哈哈哈</p>;
    //     }
    // }
    componentDidMount() {
        var _this = this;
        //var indexData = {};//首页数据
        //var guoneiData = {};//国内数据
        //var guowaiData = {};//国外数据
        //var shishiData = {};//实时数据

        request.get("http://www.kangyupeng.cn:8080/api/yq")
            .then(function (data) {
                _this.setState({
                    indexData: data.indexData
                })
                //保存首页数据
                _this.saveData('ChangeI', data.indexData);
                //保存国内数据
                _this.saveData('ChangeGn', data.guoneiData);
                //保存国外数据
                _this.saveData('ChangeGw', data.guowaiData);
                //保存实时数据
                _this.saveData('ChangeSs', data.shishiData);

            })
            .catch(function (err) {
                console.error(err)
            })
        //获取天气api数据
        // request.get("https://tianqiapi.com/api?version=epidemic&appid=25151648&appsecret=w05RudbO")
        //     .then(function (data1) {

        //         //获取腾讯api数据
        //         //request.get("https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5")
        //         //.then(function (data2) {

        //         //执行方法
        //         console.log('开始执行');
        //         //console.log(tengxunData.data);
        //         var data1 = data1.data//天气api数据
        //         //var data2 = eval(tengxunData.data)//腾讯api数据

        //         //处理国内地图数据start
        //         var mapArr = [];
        //         var list = data1.area;
        //         var len = list.length;
        //         for (var i = 0; i < len; i++) {
        //             if (list[i].cities) {
        //                 var cityList = list[i].cities;
        //                 var cityListLen = cityList.length;
        //                 //console.log(list[i]);
        //                 if (list[i].provinceName.search("(天津|北京|上海|重庆|香港|澳门|台湾)") != -1) {
        //                     //console.log(list[i].provinceName + "确诊：" + list[i].confirmedCount);
        //                     mapArr.push({ "name": list[i].provinceName, "value": list[i].confirmedCount })
        //                     continue;
        //                 }
        //                 for (var j = 0; j < cityListLen; j++) {
        //                     //输出市
        //                     //console.log(cityList[j].cityName + "确诊：" + cityList[j].confirmedCount);
        //                     mapArr.push({ "name": cityList[j].cityName, "value": cityList[j].confirmedCount })
        //                 }
        //             }
        //         }
        //         console.log('开始执行');
        //         guoneiData.mapData = mapArr;
        //         mapArr = [];
        //         list = null;
        //         len = null;
        //         //处理国内地图数据end

        //         //处理国外地图数据start
        //         // list = data2.areaTree;
        //         // len = list.length;
        //         // for (var i = 0; i < len; i++) {
        //         //     mapArr.push({ "name": list[i].name, "value": list[i].total.confirm })
        //         //     //console.log(list[i].name + " : " + list[i].total.confirm);
        //         //     //console.log(list[i].total.confirm);
        //         // }
        //         // guowaiData.mapData = mapArr;
        //         // mapArr = [];
        //         // list = null;
        //         // len = null;
        //         //处理国外地图数据end


        //         //处理国内图表数据start
        //         var tubiaoObj = {};

        //         //curesNum  治愈人数
        //         //deathsNum 死亡人数
        //         //confirmedNum 确证人数
        //         //suspectedNum 疑似人数
        //         //date      当天时间

        //         var historyArr = data1.history;
        //         var dataTypeColor = ['#e10000', '#ffa352', '#34aa70', '#333'];
        //         var dataType = ["确证", "疑似", "治愈", "死亡"];
        //         var dataTypeKey = ["confirmedNum", "suspectedNum", "curesNum", "deathsNum"];
        //         var dataTypeLen = dataType.length;
        //         var len = historyArr.length;
        //         var xArr = [];//x轴坐标
        //         var shujuArr = [];//每个类型的数据
        //         for (var i = 0; i < len; i++) {
        //             xArr.push(historyArr[i].date);
        //             for (var j = 0; j < dataTypeLen; j++) {
        //                 if (shujuArr[j] == undefined) {
        //                     //没有则创建
        //                     shujuArr[j] = {
        //                         "name": dataType[j],
        //                         "type": 'line',
        //                         "areaStyle": {},
        //                         "smooth": true,
        //                         "label": {
        //                             normal: {
        //                                 show: true,
        //                                 position: 'top'
        //                             }
        //                         },
        //                         itemStyle: {
        //                             color: dataTypeColor[j]
        //                         },
        //                         data: [historyArr[i][dataTypeKey[j]]]//注入数据
        //                     };
        //                 } else {
        //                     //有则直接存数据
        //                     shujuArr[j].data[i] = historyArr[i][dataTypeKey[j]];
        //                 }
        //             }
        //         }
        //         tubiaoObj.dataTypeColor = dataTypeColor;
        //         tubiaoObj.dataType = dataType;
        //         tubiaoObj.xArr = xArr;
        //         tubiaoObj.shujuArr = shujuArr;
        //         guoneiData.tableData = tubiaoObj;

        //         //处理国内图表数据end


        //         //处理国外图表数据start

        //         //处理国外图表数据end


        //         //处理国内列表数据start
        //         var area = data1.area;
        //         var newArr = [];
        //         area.forEach((item, index) => {
        //             var obj = {
        //                 "name": item.provinceName,
        //                 "isShowChild": false,//是否显示子列表
        //                 "aNum": item.confirmedCount,//确诊
        //                 "cNum": item.curedCount,//治愈
        //                 "dNum": item.deadCount,//死亡
        //                 "child": []
        //             }
        //             if (item.cities) {
        //                 var arr = [];
        //                 item.cities.forEach((item2, index2) => {
        //                     var obj2 = {
        //                         "name": item2.cityName,
        //                         "aNum": item2.confirmedCount,//确诊
        //                         "cNum": item2.curedCount,//治愈
        //                         "dNum": item.deadCount,//死亡
        //                     }
        //                     arr.push(obj2)
        //                 })
        //                 obj.child = arr;
        //             }
        //             newArr.push(obj)
        //         });
        //         guoneiData.listData = newArr;
        //         //处理国内列表数据end


        //         //处理国外列表数据start

        //         //处理国外列表数据end

        //         //保存天气api数据
        //         _this.saveData('ChangeTq', data1)

        //         //保存腾讯api数据
        //         //_this.saveData('ChangeTx', data2)

        //         //保存国内数据
        //         _this.saveData('ChangeGn', guoneiData)

        //         //保存国外数据
        //         _this.saveData('ChangeGw', guowaiData)

        //         //保存实时数据
        //         _this.saveData('ChangeSs', shishiData)



        //         //执行方法


        //         //})
        //         //.catch(function (err) {
        //         //   console.log(err);
        //         //})


        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     })
    }
    //redux有数据变化了
    storeChange() {
        this.setState({
            indexData: store.getState().indexData,
            xUrl: store.getState().xUrl
        })
    }
    //保存数据到store
    saveData(type, data) {
        var action = { type: type, value: data }
        store.dispatch(action);
    }
    //打开不同的导航内容
    setNav(a) {
        var _this = this;
        _this.setState({
            isGuonei: false,
            isGuowai: false,
            isShishi: false
        }, function () {
            if (a == 'isGuonei') {
                _this.setState({
                    isGuonei: true
                })
            } else if (a == 'isGuowai') {
                _this.setState({
                    isGuowai: true
                })
            } else if (a == 'isShishi') {
                _this.setState({
                    isShishi: true
                })
            }
        })
    }
}
export default Index