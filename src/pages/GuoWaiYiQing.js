import React, { Component, Fragment } from 'react'

import store from '../store/index'

import MapView from '../components/mapView'

import TuBiao2 from '../components/tuBiao2'

import YqList from '../components/yqList'

import GuoWaiYiQing_StatusInfo from '../components/GuoWaiYiQing_StatusInfo'

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
                <GuoWaiYiQing_StatusInfo data={this.state.guowaiData.indexData}/>
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