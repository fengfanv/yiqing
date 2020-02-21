import React, { Component, Fragment } from 'react';

import echarts from 'echarts'

//引入地图的易拉类型
import "echarts/dist/extension/bmap.min.js"

//城市坐标数据
import cityPositionData from './cityData.json'

//地图样式数据
import MapStyle from './mapStyle.json'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapData: {}
    }
  }
  render() {
    return (
      <Fragment>
        <div id="echartsMap" style={{ width: '100%', height: '50vh' }}></div>
      </Fragment>
    )
  }
  componentDidMount() {
    //在这里写这个是因为，当组件运行过后，关闭了这个组件，又从新打开了组件，组件的state里面没有值，但是因为打开过一次props里有还有值，所以利用这一点，直接从props里那数据
    // console.log('地图组件加载！,state');
    // console.log(this.state);
    // console.log('地图组件加载！,props');
    // console.log(this.props);
    if (this.props.data == undefined) {
    } else {
      this.setState({
        mapData: this.props.data
      }, function () {
        this.loadMap();
      });
    }
  }
  componentWillReceiveProps(nextPorps) {
    //console.log('地图组件props运行！');
    var _this = this;
    //当组件接收到props时执行
    /**
     * echarts
     * 文档地址：https://www.echartsjs.com/zh/option.html#series-effectScatter
     * 文档使用：当想访问scatter这个类型的插件时，https://www.echartsjs.com/zh/option.html#这个网址#后面加scatter这个单词，当想知道scatter里面data时接着在scatter后面加  .data  就知道了  他这个文档有点逗比
     */
    if (_this.props.data != nextPorps.data) {
      //console.log(nextPorps);
      //console.log('我mapView接收到了参数');
      _this.setState({
        mapData: nextPorps.data
      }, function () {
        this.loadMap();
      });
    }
  }
  daoXunArr(arr) {
    //数组倒叙
    var newArr = [];
    var arrLen = arr.length - 1;
    for (var i = 0; i <= arrLen; i++) {
      newArr[i] = arr[arrLen - i];
    }
    return newArr
  }
  loadMap() {
    const data = this.state.mapData;//城市疫情数量数据
    var myChart = echarts.init(document.getElementById('echartsMap'));
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = cityPositionData[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };
    //排序后的数组
    var yiqingArr = convertData(data.sort(function (a, b) {
      return b.value - a.value;
    }));

    //前五
    var newYiqingArrTop5 = this.daoXunArr(yiqingArr.slice(0, 6));

    //除了前五的数据,后面，最后渲染
    var newyiqingArr = this.daoXunArr(yiqingArr.slice(6));


    var MaxValue = newYiqingArrTop5[newYiqingArrTop5.length-1].value;
    var center = [MaxValue[0],MaxValue[1]];//获取最大的中心坐标
    //配置项
    var option = {
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center: center,//[104.114129, 37.550339],
        zoom: 1,
        roam: true,
        mapStyle: {
          //地图样式
          styleJson: MapStyle
        }
      },
      series: [
        {
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: newYiqingArrTop5,
          symbolSize: function (val) {
            if (val[2] > 10000) {
              return val[2] / 10000 + 70;
            } else if (val[2] > 1000) {
              return val[2] / 1000 + 50;
            } else if (val[2] > 100) {
              return val[2] / 100 + 30;
            } else {
              return val[2] / 10 + 10;
            }
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'fill',
            scale: 1.6
          },
          hoverAnimation: true,
          label: {
            show: true,
            formatter: '{b}',
            color: "white",
            verticalAlign: 'middle'
          },
          itemStyle: {
            color: 'rgba(238,2,22,0.4)',
            shadowBlur: 5,
            shadowColor: '#333'
          },
          z: 2,
          tooltip: {
            formatter: function (a) {
              return a.name + " ：" + a.value[2] + "人"
            }
          }
        },
        {
          name: '',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: newyiqingArr,
          symbolSize: function (val) {
            if (val[2] > 10000) {
              return val[2] / 10000 + 70;
            } else if (val[2] > 1000) {
              return val[2] / 1000 + 50;
            } else if (val[2] > 100) {
              return val[2] / 100 + 30;
            } else {
              return val[2] / 10 + 10;
            }
          },
          label: {
            formatter: '{b}',
            show: false,
            verticalAlign: 'middle',
            color: 'white'
          },
          itemStyle: {
            color: 'rgba(238,2,22,1)'
          },
          emphasis: {
            label: {
              show: true
            }
          },
          tooltip: {
            formatter: function (a) {
              return a.name + " ：" + a.value[2] + "人"
            }
          },
          z: 1
        }
      ]
    };
    myChart.setOption(option, true)
  }
}

export default App;
