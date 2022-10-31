import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


import React from 'react';
import ReactDOM from 'react-dom';
import './public.css'
import Index from './pages/index'


//import MapView from './mapView'

//import TuBiao from './tuBiao'

//import YqList from './yqList'

//import TuBiao2 from './tuBiao2'

//import Shishidongtai from './pages/ShiShiDongTai'


ReactDOM.render(<Index />, document.getElementById('root'));
//hydrate(<Index />, document.getElementById('root'));