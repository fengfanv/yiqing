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
            guoneiData:store.getState().guoneiData
        }
        this.storeChange = this.storeChange.bind(this);//转变this指向
        store.subscribe(this.storeChange);//订阅Redux的状态
    }
    render() {
        return (
            <Fragment>
                {/* <div>国内疫情</div> */}
                <MapView data={this.state.guoneiData.mapData} />
                <TuBiao data={this.state.guoneiData.tableData} />
                <YqList data={this.state.guoneiData.listData} />
            </Fragment>
        )
    }
    componentDidMount() {
        var _this = this;
        // _this.setState({
        //     guoneiData: store.getState().guoneiData
        // });
        // console.log('国内state,start');
        // console.log(this.state);
        // console.log('国内state,end');
    }
    // shouldComponentUpdate() {
        // if (this.state.guoneiData == undefined) {
        //     return false;
        // } else {
        //     return true;
        // }
    // }
    //redux订阅模式
    storeChange() {
        this.setState({
            guoneiData: store.getState().guoneiData
        })
    }
}
export default App