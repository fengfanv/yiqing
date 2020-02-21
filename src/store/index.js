import {createStore} from 'redux'
//引入仓库管理模块
import reducer from './reducer'
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//连接浏览器Redux调试器
)
export default store