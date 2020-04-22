// pages/user/user.js
import {network} from '../../utils/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		profile:null,
		bannerList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onShow: function (options) {
		this.getData()
	},
	getData(){
		let that = this
	},
	onShareAppMessage: function () {
		let code = this.data.profile.get_promocode
		return {
			path: `/pages/home/home?code=${code}`
		}
	},
	onPullDownRefresh(){
		this.getData()
		wx.stopPullDownRefresh()
	}
})