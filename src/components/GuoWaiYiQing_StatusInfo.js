import React, { Component, Fragment } from 'react';

//国外疫情状态信息
class GuoWaiYiQing_StatusInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //list: [],//这组件与mapView、tubiao2、tuBiao区别是，那三个组件不需要修改数据，只需读数据渲染就行，所以就直接用props了
            //但是这个组件有展开子列表的操作，但是props里的数据不能修改（不能操作props），所以需要先存到state里在渲染。
            isOneWrite: 'no',//第一次是否已写入
            isOneRender: false,//第一次是否已经渲染过

            indexData: {
                nowdiagnosed: 0,
                diagnosed: 0,
                cured: 0,
                death: 0,

                nowdiagnosedIncr: 0,
                diagnosedIncr: 0,
                curedIncr: 0,
                deathIncr: 0
            }
        }
    }
    render() {
        return (
            <Fragment>
                {/*全国 总数据汇总展示*/}
                <ul className="total_list total_list2 clearfix">
                    <li>
                        <p>现有确诊</p>
                        <h3 className="e_color">{this.state.indexData.nowdiagnosed}</h3>
                        <h4>较昨日<span className="e_color">+{this.state.indexData.nowdiagnosedIncr}</span></h4>
                    </li>
                    <li>
                        <p>确诊</p>
                        <h3 className="a_color">{this.state.indexData.diagnosed || 0}</h3>
                        <h4>较昨日<span className="a_color">+{this.state.indexData.diagnosedIncr || 0}</span></h4>
                    </li>
                    <li>
                        <p>治愈</p>
                        <h3 className="c_color">{this.state.indexData.cured}</h3>
                        <h4>较昨日<span className="c_color">+{this.state.indexData.curedIncr}</span></h4>
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
        if (_this.props.data !== null && _this.props.data !== undefined && _this.props.data.nowdiagnosed >= 0) {
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
        if (nextProps.data !== null && nextProps.data.nowdiagnosed >= 0) {
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

        if (nextState.indexData !== this.state.indexData && nextState.indexData.nowdiagnosed >= 0 && this.state.isOneRender === false) {
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
GuoWaiYiQing_StatusInfo.defaultProps = {
    "data": null,
}

export default GuoWaiYiQing_StatusInfo;
