// pages/freshDetail/freshDetail.js
import {network} from '../../utils/http.js'
Page({

	data: {
		detail:null,
		bannerList:[],
		bannerIndex:0,
		tabIndex:0,
		reviewList:[]
	},
	onLoad: function (options) {
		this.getData(options.id)
	},
	getData(id){
		let that = this
		network('get', `/stores/${id}/`, '', (res) => {
			console.log(res)
			wx.setNavigationBarTitle({
				title: res.name,
			})
			that.setData({detail:res})
		})
		network('get', `/comments/?source_name=stores.store&source_pk=${id}&limit=3&offset=0`,'',(res)=>{
      console.log(res.results)
			that.setData({ reviewList:res.results})
		})
	},
	changeBanner(e) {
		this.setData({
			bannerIndex: e.detail.current
		})
	},
	changeTab(e) {
		console.log(e)
		this.setData({
			tabIndex: e.detail.current
		})
	},
	pay(e){
		let id = e.currentTarget.dataset.id
		let name = e.currentTarget.dataset.name
		wx.navigateTo({
			url: `/pages/pay/pay?id=${id}&name=${name}`,
		})
	},
	tell(e){
		let phone = e.currentTarget.dataset.phone
		if(phone){
			wx.makePhoneCall({
				phoneNumber: phone,
			})
		}else{
			wx.showToast({
				title: '商家未添加手机号',
				icon:'none'
			})
		}
		
	},
	onShareAppMessage(){

	}
})