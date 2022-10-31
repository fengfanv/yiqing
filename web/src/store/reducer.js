
const defaultState = {
    xUrl: '',//当前地址
    tianqiData: {},//天气api数据
    tengxunData: {},//腾讯api数据

    guoneiData: {
    },//已处理完国内数据
    guowaiData: {},//已处理完国外数据
    shishiData: {},//已处理完实时数据
    indexData: {},//已处理首页数据

    cityZb: {},//城市坐标数据

    pageTop: 0//距离页面顶部的距离
}
export default (state = defaultState, action) => {
    // state: 指的是原始仓库里的状态
    // action: 指的是action新传递的状态
    //console.log(state, action);
    var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
    if (action.type === "ChangeUrl") {
        //修改url地址
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        //newState.xUrl = action.value;
        //return newState
    } else if (action.type === "ChangeTq") {
        //修改天气api数据
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        newState.tianqiData = action.value;
        return newState;
    } else if (action.type === "ChangeTx") {
        //修改腾讯api数据
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        newState.tianqiData = action.value;
        return newState;
    } else if (action.type === "ChangeGn") {
        //修改国内数据
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        newState.guoneiData = action.value;
        return newState;
    } else if (action.type === "ChangeGw") {
        //修改国外数据
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        newState.guowaiData = action.value;
        return newState;
    } else if (action.type === "ChangeSs") {
        //修改实时数据
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        newState.shishiData = action.value;
        return newState;
    } else if (action.type === "ChangeI") {
        //修改首页数据
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        newState.indexData = action.value;
        return newState;
    } else if (action.type === "ChangeCityZb") {
        //修改城市坐标数据
        //var newState = JSON.parse(JSON.stringify(state));//深度拷贝state
        newState.cityZb = action.value;
        return newState;
    } else if (action.type === "ChangePageTop") {
        //修改距离页面顶部的距离
        newState.pageTop = action.value;
        return newState;
    }
    return state
}