import axios from 'axios'



export default function xaxios(method, url, params, data){
	let baseUrl = 'http://localhost:3000/';
	return axios({
			method: method,
			url: baseUrl + url,
			params: params,
			data: data,
			timeout: 60000,
		})
}