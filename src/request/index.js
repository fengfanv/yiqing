import axios from 'axios'

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(function(config){
	// console.log("请求");
	// console.log(config);
	// console.log("请求");
	return config;
},function(error){
	return Promise.error(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response){
		if (response.status === 200) {
			return Promise.resolve(response.data);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是200的情况    
	function(error){
		if (error.response.status) {
			//error.response.status  401,403,404
			return Promise.reject(error.response);
		}
	}
);

export default axios;