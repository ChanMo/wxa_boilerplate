// pages/ticket/ticket.js
import {network} from '../../utils/http.js'
Page({
  data: {
		ticketList:[],
		offset:0,
		loading:true,
		useTickets:false,
		price:0
  },
	onLoad: function (options) {
		this.setData({ loading: true })
		console.log(options)
		this.setData({ useTickets: options.useTickets ? true:false,price:options.price})
    this.getData(0)
  },
  async getData(offset) {
		let that = this
		await network('get', `/coupons/my/?offset=${offset}&limit=10&status=new`, '', (res) => {
      let list = offset == 0 ? [] : that.data.ticketList
      list = list.concat(res.results)
			if (res.results.length == 0) offset = offset
			else offset = offset + 10
      this.setData({
				ticketList: list,
        offset: offset
      })
    })
		that.setData({loading:false})
	},
	onPullDownRefresh() {
		this.getData(0)
		wx.stopPullDownRefresh()
	},
	onReachBottom() {
		this.getData(this.data.offset)
	},
	setTicket(e){
		if (this.data.price <= this.data.ticketList[e.currentTarget.dataset.index].coupon.price * 1)
		{
			wx.showToast({
				title: '该优惠券不满足使用要求',
				icon:'none'
			})
			return
		}
		if (this.data.useTickets){
			let pages = getCurrentPages()
			let prevPage = pages[pages.length-2]
			prevPage.setData({ ticket: this.data.ticketList[e.currentTarget.dataset.index]})
			wx.navigateBack({
				delta:1
			})
		}
	}
})