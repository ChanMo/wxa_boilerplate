import {
  network
} from '../../utils/http.js'
Page({
  data: {
    order: null,
    number: null,
		detail:null
  },
  onLoad: function(options) {
    this.setData({
      number: options.number
    })
    this.getData(options.number)
  },
  getData(number) {
    let that = this
    network('get', `/orders/${number}/`, '', (res) => {
      that.setData({
        order: res
      })
			if(res.status=='over'){
				network('get', `/orders/${number}/comment/`, '', (ress) => {
					console.log(ress)
				})
			}
    })
  },
	changeInput(e){
		this.setData({ content: e.detail.value})
	},
  submit() {
    let that = this
    let number = this.data.number
    network('post', `/orders/${number}/comment/`, {
			store_id: that.data.order.store.id,
      content: that.data.content
    }, (res) => {
			wx.showToast({
				title: '评价成功',
			})
      wx.navigateBack({
				
			})
    })
  }
})