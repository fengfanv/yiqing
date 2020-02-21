import React, { Component, Fragment } from 'react'

import store from '../store/index'

import MapView from '../mapView'

import TuBiao2 from '../tuBiao2'

import YqList from '../yqList'



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guowaiData:store.getState().guowaiData
        }
        this.storeChange = this.storeChange.bind(this);//转变this指向
        store.subscribe(this.storeChange);//订阅Redux的状态
    }
    render() {
        return (
            <Fragment>
                {/* <div>国外疫情</div> */}
                <MapView data={this.state.guowaiData.mapData}/>
                <TuBiao2 data={this.state.guowaiData.mapData}/>
                <YqList data={this.state.guowaiData.listData}/>
            </Fragment>
        )
    }
    //componentDidMount() {
        //console.log('国外组件加载！');
        //var _this = this;
        // _this.setState({
        //     guowaiData: store.getState().guowaiData
        // });
    //}
    // shouldComponentUpdate() {
        // if (this.state.guowaiData == undefined) {
        //     return false;
        // } else {
        //     return true;
        // }
    // }
    //redux订阅模式
    storeChange() {
        this.setState({
            guowaiData: store.getState().guowaiData
        })
    }
}
export default App