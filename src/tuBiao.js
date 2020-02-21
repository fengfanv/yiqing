import React, { Fragment, Component } from 'react'

import echarts from 'echarts';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: {}
        }
    }
    render() {
        return (
            <Fragment>
                <div id="echartsTable" className="marTop20" style={{ width: '100%', height: '50vh' ,"border":"1px solid #e1e1e1"}}></div>
            </Fragment>
        )
    }
    componentDidMount() {
        //在这里写这个是因为，当组件运行过后，关闭了这个组件，又从新打开了组件，组件的state里面没有值，但是因为打开过一次props里有还有值，所以利用这一点，直接从props里那数据
        if (this.props.data == undefined) {
        } else {
            this.setState({
                tableData: this.props.data
            }, function () {
                this.loadTable();
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        var _this = this;
        //当组件接收到props时执行
        //存数据类型
        if (_this.props.data != nextProps.data) {
            _this.setState({
                tableData: nextProps.data
            }, function () {
                _this.loadTable();
            });
        }
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
                data: _this.state.tableData.dataType
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
                    data: _this.state.tableData.xArr
                }
            ],
            yAxis: {
                type: 'value',

            },
            //每个类型的数据
            series: _this.state.tableData.shujuArr
            
        };
        myChart.setOption(option, true)
    }
}
export default App
