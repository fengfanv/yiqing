import React, { Component, Fragment } from 'react'

import store from '../store/index'

import './shishidongtai.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shishiData: store.getState().shishiData
        }
        this.storeChange = this.storeChange.bind(this);//转变this指向
        store.subscribe(this.storeChange);//订阅Redux的状态
    }
    render() {
        return (
            <Fragment>
                {/* <div>实时动态</div> */}
                <ul className="shishi_list">
                    {
                        this.state.shishiData.list.map((item, index) => {
                            return (
                                <li key={'shshi'+index}>
                                    <div className={index===0?"shishi_list_time_one":"shishi_list_time"}>{item.date}</div>
                                    <div className="shishi_list_content">
                                        <h1>{item.title}</h1>
                                        <p>{item.content.replace(/�/g,"")}</p>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>

            </Fragment>
        )
    }
    //redux订阅模式
    storeChange() {
        this.setState({
            shishiData: store.getState().shishiData
        })
    }
}
export default App