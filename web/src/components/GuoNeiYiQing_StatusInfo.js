import React, { Component, Fragment } from 'react';

//国内疫情，状态信息
class GuoNeiYiQing_StatusInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //list: [],//这组件与mapView、tubiao2、tuBiao区别是，那三个组件不需要修改数据，只需读数据渲染就行，所以就直接用props了
            //但是这个组件有展开子列表的操作，但是props里的数据不能修改（不能操作props），所以需要先存到state里在渲染。
            isOneWrite: 'no',//第一次是否已写入
            isOneRender: false,//第一次是否已经渲染过

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
            }
        }
    }
    render() {
        return (
            <Fragment>
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
            </Fragment>
        )
    }
    componentDidMount() {
        var _this = this;


        if (_this.props.data !== null && _this.props.data !== undefined && _this.props.data.suspect >= 0) {
            //console.log('执行了');
            //console.log('渲染了33');
            _this.setState({
                indexData: _this.props.data
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        //当组件接收到props时执行，
        var _this = this;
        if (nextProps.data !== null && nextProps.data.suspect >= 0) {
            //console.log('监听到了2');
            if (_this.state.isOneWrite !== "yes") {
                //没有写入才写入，防止重复写入，重复渲染这个组件
                console.log('写入了');
                _this.setState({
                    indexData: nextProps.data,
                    isOneWrite: "yes"//是否已经写入
                });
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {

        if (nextState.indexData !== this.state.indexData && nextState.indexData.suspect >= 0 && this.state.isOneRender === false) {
            //提示：{"name":1} !== {"name":1} ==>true
            //提示：[1,2,3] !== [1,2,3] ==>true
            //提示：[1,2,3] !== [] ==>true
            //nextState.list !== this.state.list ==> true 写这句话只是为了让他就执行一次这块代码
            //数组
            //防止重复渲染
            this.setState({
                isOneRender: true
            });
            //console.log('因list第一次写入而渲染');
            return true;
        }
        return false;
    }

}
//设置props默认值
GuoNeiYiQing_StatusInfo.defaultProps = {
    "data": null,
}

export default GuoNeiYiQing_StatusInfo;
