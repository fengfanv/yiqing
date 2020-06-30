import React, { Fragment, Component } from 'react'

import echarts from 'echarts';

class tuBiao extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: null//不用这个数据了，直接用props
        }
    }
    render() {
        return (
            <Fragment>
                <div id="echartsTable" className="marTop20" style={{ width: '100%', height: '50vh', "border": "1px solid #e1e1e1" }}></div>
            </Fragment>
        )
    }
    componentDidMount() {
        //页面渲染完毕后执行
        var _this = this;
        if (_this.props.data !== null && _this.props.data.dataType !== undefined && _this.props.data.xArr !== undefined && _this.props.data.dataTypeColor !== undefined) {
            _this.loadTable();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        //当props或state改变时执行
        var _this = this;
        if (_this.props.data !== null && _this.props.data.dataType !== undefined && _this.props.data.xArr !== undefined && _this.props.data.dataTypeColor !== undefined) {
            return true;
        }
        return false;
    }
    componentWillUpdate() {
        var _this = this;
        //console.log('当允许渲染后执行');
        _this.loadTable();
    }
    loadTable() {
        var _this = this;
        var myChart = echarts.init(document.getElementById('echartsTable'));

        //curesNum  治愈人数
        //deathsNum 死亡人数
        //confirmedNum 确证人数
        //suspectedNum 疑似人数
        //date      当天时间
        // var dataTypeColor = ['#e10000','#ffa352','#34aa70','#333'];
        //var dataType = ["确证", "疑似", "治愈", "死亡"];
        // var dataTypeKey = ["confirmedNum", "suspectedNum", "curesNum", "deathsNum"];
        // var dataTypeLen = dataType.length;
        // var len = historyArr.length;
        // var xArr = [];//x轴坐标
        // var shujuArr = [];//每个类型的数据
        // for (var i = 0; i < len; i++) {
        //     xArr.push(historyArr[i].date);
        //     for (var j = 0; j < dataTypeLen; j++) {
        //         if (shujuArr[j] == undefined) {
        //             //没有则创建
        //             shujuArr[j] = {
        //                 "name": dataType[j],
        //                 "type": 'line',
        //                 "areaStyle": {},
        //                 "smooth": true,
        //                 "label": {
        //                     normal: {
        //                         show: true,
        //                         position: 'top'
        //                     }
        //                 },
        //                 itemStyle:{
        //                     color:dataTypeColor[j]
        //                 },
        //                 data: [historyArr[i][dataTypeKey[j]]]//注入数据
        //             };
        //         } else {
        //             //有则直接存数据
        //             shujuArr[j].data[i] = historyArr[i][dataTypeKey[j]];
        //         }
        //     }
        // }


        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                //放数据类型
                data: _this.props.data.dataType
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    //横坐标的坐标
                    data: _this.props.data.xArr
                }
            ],
            yAxis: {
                type: 'value',

            },
            //每个类型的数据
            series: _this.props.data.shujuArr

        };
        myChart.setOption(option, true)
    }
}
tuBiao.defaultProps = {
    "data": null
}
export default tuBiao
