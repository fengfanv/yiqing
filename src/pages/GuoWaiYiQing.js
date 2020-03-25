import React, { Component, Fragment } from 'react'

import store from '../store/index'

import MapView from '../mapView'

import TuBiao2 from '../tuBiao2'

import YqList from '../yqList'

import GuoWaiYiQing_index from '../GuoWaiYiQing_index'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guowaiData: store.getState().guowaiData,
            cityPositionData: store.getState().cityZb,
            
        }
        this.storeChange = this.storeChange.bind(this);//转变this指向
        store.subscribe(this.storeChange);//订阅Redux的状态
    }
    render() {
        return (
            <Fragment>
                
                {/* <div>国外疫情</div> */}
                <GuoWaiYiQing_index data={this.state.guowaiData.indexData}/>
                <MapView data={this.state.guowaiData.mapData} cityPositionData={this.state.cityPositionData} />
                <TuBiao2 data={this.state.guowaiData.mapData} />
                <YqList data={this.state.guowaiData.listData} />
            </Fragment>
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.guowaiData !== nextState.guowaiData && this.state.guowaiData.indexData !== undefined) {
            this.setState({
                indexData:this.state.guowaiData.indexData
            })
            return true
        } else {
            return false
        }
    }
    //redux订阅模式
    storeChange() {
        this.setState({
            guowaiData: store.getState().guowaiData,
            cityPositionData: store.getState().cityZb
        })
    }
}
export default App