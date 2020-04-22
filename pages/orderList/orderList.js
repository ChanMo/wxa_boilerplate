// pages/order/order.js
import { network } from '../../utils/http.js'
Page({
	data: {
		tabList: ['待支付','待发货', '待评价', '已完成'],
		tab_active: 0,
		ordersList: [1,2,3,4,5],
		loading: false
	},
	onShow: function (options) {
		this.getData(0, this.data.tab_active)
	},
	getData(offset, active) {
		console.log(offset,active)
	},
	changeTab(e) {
		let index = e.currentTarget.dataset.index
		this.setData({ tab_active: index })
		this.getData(0, this.data.tab_active)
	},
	onPullDownRefresh() {
		this.getData(0, this.data.tab_active)
		wx.stopPullDownRefresh()
	},
	onReachBottom() {
		this.getData(this.data.offset, this.data.tab_active)
	}
})