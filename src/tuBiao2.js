import React, { Component, Fragment } from 'react'

import echarts from 'echarts';

class tuBiao2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: null//这个不用了，直接用props
        }
    }
    render() {
        return (
            <Fragment>
                <div id="echartsTable2" className="marTop20" style={{ width: '100%', height: '550px', "border": "1px solid #e1e1e1" }}></div>
            </Fragment>
        )
    }
    componentDidMount() {
        var _this = this;
        //当组件渲染完毕后执行
        if (_this.props.data !== null && _this.props.data.length > 0) {
            _this.loadTable2()
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        var _this = this;
        //当props或state改变后执行
        if (_this.props.data !== null && _this.props.data.length > 0) {
            return true;
        }

        return false;
    }
    componentWillUpdate() {
        var _this = this;
        _this.loadTable2()
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
                    data: _this.props.data
                }
            ]
        };

        myChart.setOption(option, true);

    }
}
tuBiao2.defaultProps = {
    "data": null
}
export default tuBiao2