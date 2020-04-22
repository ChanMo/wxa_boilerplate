import {
network
} from '../../utils/http.js'
Page({
	data: {
		pointsList:[],
		offset:0,
    loading:false
	},
	onLoad: function (options) {
		this.getData(0)
	},
	getData(offset) {
		let that = this
    this.setData({loading:true})
		network('get', `/points/log/?offset=${offset}&limit=10`, '', (res) => {
			let list = offset == 0 ? [] : that.data.pointsList
			list = list.concat(res.results)
			this.setData({
				pointsList: list,
				offset: offset + 10,
        loading:false
			})
		})
	},
	onPullDownRefresh(){
		this.getData(this.data.offset)
		wx.stopPullDownRefresh()
	},
	onReachBottom() {
		this.getData(this.data.offset)
	}
})