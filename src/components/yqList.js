import React, { Component, Fragment } from 'react';

import './yqList.css';

class yqList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],//这组件与mapView、tubiao2、tuBiao区别是，那三个组件不需要修改数据，只需读数据渲染就行，所以就直接用props了
                    //但是这个组件有展开子列表的操作，但是props里的数据不能修改（不能操作props），所以需要先存到state里在渲染。
            isOneWrite: 'no',//第一次是否已写入
            isOneRender: false,//第一次是否已经渲染过
            showChildEvent: false,//list里某项发生变化时，true有发生变化，false没有发生变化
            isYqListHead80: false//疫情导航是否悬浮起来
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
                <div id="yqListHead" className={"marTop20 yqListHeadFa"}>
                    <div className={(this.state.isYqListHead80 ? "yqListHead80" : "") + " yqListHeader clearfix"}>
                        <h5 className="yqListTap2">地区</h5>
                        <p>确诊</p>
                        <p>治愈</p>
                        <p>死亡</p>
                    </div>
                </div>
                <ul className="yqList">
                    {
                        this.state.list.map((item, index) => {
                            var itemList = item.child;
                            return (
                                <li key={'1' + index} onClick={this.isShowChild.bind(this, index)}>
                                    <div className="clearfix">
                                        <h5 className={item.child.length !== 0 ? "yqListTap" : "yqListTap2"}>{item.name}</h5>
                                        <p>{item.aNum}</p>
                                        <p>{item.cNum}</p>
                                        <p>{item.dNum}</p>
                                    </div>
                                    <ul className={item.isShowChild === true ? "childShow" : "childHide"}>
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
    componentDidMount() {
        var _this = this;
        //监听滚动条滚动事件
        var yqListHeadDocument = document.getElementById('yqListHead');
        function yQautoScroll(e) {
            //这里算750尺寸的rem  不同尺寸下的真实参数等于 (屏幕的宽/750*100)*(元素750尺寸量的值/100)
            var canshu80 = document.body.offsetWidth > 750 ? 80 : document.body.offsetWidth / 750 * 80;//这80是导航的高度
            if (yqListHeadDocument.getBoundingClientRect().top - canshu80 > 0) {
                if (_this.state.isYqListHead80 !== false) {
                    //console.log('疫情list不需要悬浮');
                    _this.setState({
                        isYqListHead80: false
                    })
                }
            } else {
                if (_this.state.isYqListHead80 === false) {
                    //console.log('疫情list需要悬浮了');
                    _this.setState({
                        isYqListHead80: true
                    })
                }
            }
        }
        if (window.addEventListener) {
            window.addEventListener('scroll', yQautoScroll, false);
        } else if (window.attachEvent) {
            //window.attachEvent('onscroll', autoScroll);
            document.onscroll = yQautoScroll
        }

        if (_this.props.data !== null && _this.props.data !== undefined && _this.props.data.length > 0) {
            //console.log('执行了');
            //console.log('渲染了33');
            _this.setState({
                list: _this.props.data
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        //当组件接收到props时执行，
        var _this = this;
        if (nextProps.data !== null && nextProps.data.length > 0) {
            //console.log('监听到了2');
            if (_this.state.isOneWrite !== "yes") {
                //没有写入才写入，防止重复写入，重复渲染这个组件
                console.log('写入了');
                _this.setState({
                    list: nextProps.data,
                    isOneWrite: "yes"//是否已经写入
                });
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps);
        // console.log(this.props);
        // console.log('监听到了');
        // console.log(nextState.list);
        // console.log(this.state.list);
        
        //var _this = this;
        //console.log(this.state.isOneRender);
        if (nextState.list !== this.state.list && nextState.list.length > 0 && this.state.isOneRender === false) {
            //提示：{"name":1} !== {"name":1} ==>true
            //提示：[1,2,3] !== [1,2,3] ==>true
            //提示：[1,2,3] !== [] ==>true
            //nextState.list !== this.state.list ==> true 写这句话只是为了让他就执行一次这块代码
            //数组
            //防止重复渲染
            this.setState({
                isOneRender: true
            });
            console.log('因list第一次写入而渲染');
            return true;
        }
        //list里某个子项显示了
        if (nextState.showChildEvent === true) {
            //list里某项发生变化时，允许渲染
            console.log('因为list某项发生变化而渲染');
            this.setState({
                showChildEvent: false//恢复成false，为下一个某项变化做准备
            })
            return true
        }
        if (nextState.isYqListHead80 !== this.state.isYqListHead80) {
            //当isYqListHead80发生变化时渲染
            console.log('因isYqListHead80发生变化而渲染');
            return true
        }
        return false;
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
    isShowChild(index) {
        var list = this.state.list;
        list[index].isShowChild = list[index].isShowChild ? false : true;
        this.setState({
            list,
            showChildEvent: true
        }, function () {
            //console.log('打开子项目');
        });

    }
}
//设置props默认值
yqList.defaultProps = {
    "data": null,
}

export default yqList;
