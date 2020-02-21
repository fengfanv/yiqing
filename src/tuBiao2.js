import React, { Component, Fragment } from 'react'

import echarts from 'echarts';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    render() {
        return (
            <Fragment>
                <div id="echartsTable2" className="marTop20" style={{ width: '100%', height: '550px',"border":"1px solid #e1e1e1" }}></div>
            </Fragment>
        )
    }
    componentDidMount() {
        //在这里写这个是因为，当组件运行过后，关闭了这个组件，又从新打开了组件，组件的state里面没有值，但是因为打开过一次props里有还有值，所以利用这一点，直接从props里那数据
        if (this.props.data == undefined) {
        } else {
            this.setState({
                list: this.props.data
            }, function () {
                this.loadTable2()
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        //接收到props时执行
        var _this = this;
        if (_this.props.data != nextProps.data) {
            _this.setState({
                list: nextProps.data
            }, function () {
                _this.loadTable2()
            });
        }
    }
    loadTable2() {
        var _this = this;
        var myChart = echarts.init(document.getElementById('echartsTable2'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: '40%',
                    center: ['50%', '38%'],
                    //roseType: 'radius',//'area',
                    data: _this.state.list
                }
            ]
        };

        myChart.setOption(option, true);

    }
}
export default App