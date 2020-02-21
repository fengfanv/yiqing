import React, { Component, Fragment } from 'react';

import './yqList.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
            // list: [
            //     {
            //         "name": "湖北省",
            //         "isShowChild": false,//是否显示子列表
            //         "aNum": 3000,//确诊
            //         "cNum": 8999,//治愈
            //         "dNum": 0,//死亡
            //         "child": [
            //             {
            //                 "name": "武汉",
            //                 "aNum": 3000,//确诊
            //                 "cNum": 8999,//治愈
            //                 "dNum": 0,//死亡
            //             }
            //         ]
            //     },
            //     {
            //         "name": "河南省",
            //         "isShowChild": false,//是否显示子列表
            //         "aNum": 3000,//确诊
            //         "cNum": 8999,//治愈
            //         "dNum": 0,//死亡
            //         "child": []
            //     }
            // ]
        }
    }
    render() {
        return (
            <Fragment>
                <div className="yqListHeader marTop20 clearfix">
                    <h5 className="yqListTap2">地区</h5>
                    <p>确诊</p>
                    <p>治愈</p>
                    <p>死亡</p>
                </div>
                <ul className="yqList">
                    {
                        this.state.list.map((item, index) => {
                            var itemList = item.child;
                            return (
                                <li key={'1' + index} onClick={this.isShowChild.bind(this, index)}>
                                    <div className="clearfix">
                                        <h5 className={item.child.length != 0 ? "yqListTap" : "yqListTap2"}>{item.name}</h5>
                                        <p>{item.aNum}</p>
                                        <p>{item.cNum}</p>
                                        <p>{item.dNum}</p>
                                    </div>
                                    <ul className={item.isShowChild == true ? "childShow" : "childHide"}>
                                        {
                                            itemList.map((item2, index2) => {
                                                return (
                                                    <li key={'2' + index2} className="yqListChildList clearfix">
                                                        <h5 className="yqListTap2" style={{ "fontWeight": "normal" }}>{item2.name}</h5>
                                                        <p>{item2.aNum}</p>
                                                        <p>{item2.cNum}</p>
                                                        <p>{item2.dNum}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            </Fragment>
        )
    }
    isShowChild(index) {
        var list = this.state.list;
        list[index].isShowChild = list[index].isShowChild ? false : true;
        this.setState({
            list
        });
    }
    componentDidMount(){
        //在这里写这个是因为，当组件运行过后，关闭了这个组件，又从新打开了组件，组件的state里面没有值，但是因为打开过一次props里有还有值，所以利用这一点，直接从props里那数据
        // console.log('疫情列表。运行,props');
        // console.log(this.props);
        // console.log('疫情列表。运行,state');
        // console.log(this.state);
        if(this.props.data == undefined){
        }else{
            this.setState({
                list: this.props.data
            });
        }
    }
    // shouldComponentUpdate() {
    //     //组件发生改变前执行
    //     var _this = this;
    //     if (_this.props.data == undefined) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        //当组件接收到props时执行
        var _this = this;
        if (_this.props.data != nextProps.data){
            _this.setState({
                list: nextProps.data
            });
        }
    }
    //componentDidMount() {
    // var _this = this;
    // var data = yiqingData.data;
    // console.log(data);
    // var area = data.area;
    // var newArr = [];
    // area.forEach((item, index) => {
    //     var obj = {
    //         "name": item.provinceName,
    //         "isShowChild": false,//是否显示子列表
    //         "aNum": item.confirmedCount,//确诊
    //         "cNum": item.curedCount,//治愈
    //         "dNum": item.deadCount,//死亡
    //         "child": []
    //     }
    //     if (item.cities) {
    //         var arr = [];
    //         item.cities.forEach((item2, index2) => {
    //             var obj2 = {
    //                 "name": item2.cityName,
    //                 "aNum": item2.confirmedCount,//确诊
    //                 "cNum": item2.curedCount,//治愈
    //                 "dNum": item.deadCount,//死亡
    //             }
    //             arr.push(obj2)
    //         })
    //         obj.child = arr;
    //     }
    //     newArr.push(obj)
    // });
    // this.setState({
    //     list:newArr
    // })
    //}
}

export default App;
