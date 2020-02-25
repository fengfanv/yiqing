import React, { Component, Fragment } from 'react'

import store from '../store/index'

//引入子组件
import MapView from '../mapView'

import TuBiao from '../tuBiao'

import YqList from '../yqList'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guoneiData: store.getState().guoneiData,
            cityPositionData: store.getState().cityZb
        }
        this.storeChange = this.storeChange.bind(this);//转变this指向
        store.subscribe(this.storeChange);//订阅Redux的状态
    }
    render() {
        return (
            <Fragment>
                {/* <div>国内疫情</div> */}
                <MapView data={this.state.guoneiData.mapData} cityPositionData={this.state.cityPositionData} />
                <TuBiao data={this.state.guoneiData.tableData} />
                <YqList data={this.state.guoneiData.listData} />
            </Fragment>
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        //渲染完页面后，在当props或state发生改变时才执行
        //console.log(this.state.guoneiData !== nextState.guoneiData);
        // console.log('nextState里')
        // console.log(nextState.guoneiData);
        // console.log('state里')
        // console.log(this.state.guoneiData);
        // console.log('结果'+(this.state.guoneiData === nextState.guoneiData));
        //当this.state.guoneiData里和nextState.guoneiData不一样时渲染数据
        //很奇怪这里的this.state.guoneiData和nextState.guoneiData不一样时就能判断出来，这里的类型是object
        if (this.state.guoneiData !== nextState.guoneiData) {
            return true
        } else {
            return false
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => { return; }
    }
    //redux订阅模式，store数据发生变化时执行
    storeChange() {
        this.setState({
            guoneiData: store.getState().guoneiData,
            cityPositionData: store.getState().cityZb
        });
    }
}
export default App