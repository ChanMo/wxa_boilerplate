// pages/integral/integral.js
import { network} from '../../utils/http.js'
Page({
	data: {
		profile:null,
		goodsList:[],
		offset:0,
    loading:false
	},
	onShow: function (options) {
		this.getData()
	},
	onPullDownRefresh(){
		this.getData()
		wx.stopPullDownRefresh()
	},
	getData(){
		let that = this
		network('get', '/accounts/profile/', '', (res) => {
			console.log(res)
			that.setData({ profile: res })
		})
		this.getList(0)
	},
	getList(offset){
		let that = this
    this.setData({ loading:true})
		network('get', `/shop/product/?offset=${offset}&limit=6`, '', (res) => {
			let list = offset == 0 ? [] : that.data.goodsList
			list = list.concat(res.results)
			this.setData({
        goodsList: list,
				offset: offset + 6,
        loading: false
			})
		})
	},
	onReachBottom(){
		this.getList(this.data.offset)
	}
})