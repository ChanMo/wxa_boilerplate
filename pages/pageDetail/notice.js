// pages/notice/notice.js
import { network} from '../../utils/http.js'
Page({
	data: {
		notice:null
	},
	onLoad: function (options) {
		this.getData(options.id)
	},
	getData(id){
		let that = this
		network('get', `/tinypages/${id}/`, '', async (res) => {
			wx.setNavigationBarTitle({
				title: res.title,
			})
			let content = res.content.replace(new RegExp('<img ', 'g'), '<img style="width:100%;height:100%;" ')
			res.content = content.replace(new RegExp('style=""', 'g'), '')
			that.setData({ notice:res})
		})
	},
	onShareAppMessage(){
		
	}

})