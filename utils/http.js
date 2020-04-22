
let  uri = 'http://192.168.0.186:8000'
let headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
}
const network = async (method, api, data, back, needToken = true, canRefresh = true) => {
	const token = await wx.getStorageSync('token')
	console.log('网络请求：', method, api, data)
	if (token && needToken) {
		headers['Authorization'] = 'Bearer ' + token
	}
	wx.request({
		method: method,
		header: headers,
		data: data,
		url: uri + api,
		success(res) {
			if (res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 204) {
				back(res.data)
			} else if (res.statusCode == 401) {
				console.log(canRefresh)
				if (res.data.code == 'user_not_found') {
					console.log(res.data)
					wxLogin()
				} else if (canRefresh) {
					refreshToken(() => network(method, api, data, back, needToken, false))
				}
			} else if (res.statusCode == 400) {
				wx.showToast({
					title: '参数错误',
					icon: 'none'
				})
			} else if (res.statusCode == 500) {
				wx.showToast({
					title: '服务器错误',
					icon: 'none'
				})
			}
		},
		fail(err) {
			console.error('Error: ', err)
		}
	})
}
const refreshToken = async (back = null) => {
	const refresh = await wx.getStorageSync('refresh')
	if (refresh) {
		wx.request({
			method: 'post',
			url: uri + '/auth/token/refresh/',
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: {
				refresh: refresh
			},
			async success(res) {
				if (res.statusCode == 200) {
					await wx.setStorage({
						key: 'token',
						data: res.data.access,
					})
					if (back) back(res.data)
				} else {
					wxLogin()
				}
			}
		})
	} else {
		wx.showToast({
			title: 'token丢失，请删除小程序后再次登录',
			icon: 'none'
		})
	}

}

const wxLogin = async () => {
	console.log('refreshToken失效')
	await wx.clearStorage()
	wx.showToast({
		title: '刷新中',
		icon: 'loading'
	})
	wx.login({
		success: async (res) => {
			await network('get', `/social/auth/wxa/?code=${res.code}`, '', async (ress) => {
				await wx.setStorage({
					key: 'token',
					data: ress.access,
				})
				wx.setStorage({
					key: 'refresh',
					data: ress.refresh,
				})
				return
				wx.reLaunch({
					url: '/pages/home/home'
				})
			}, false)

			wx.hideToast()
		}
	})
}

export {
	uri,
	network
}