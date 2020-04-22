// pages/success/success.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order:null,
		type:null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)

		if (options.type){
      this.setData({ type: options.type })
      this.setData({ number: options.number })
    } else {
      this.setData({ order: options.order })
    }
	},
	seeOrder(){
		let order = this.data.order
		wx.navigateTo({
			url: `/pages/theOrder/theOrder?order=${order}`,
		})
	},
  seeChange(){
    let number = this.data.number
    wx.navigateTo({
      url: `/pages/exchangeDetail/exchangeDetail?number=${number}`,
    })
  },
	backHome(){
		wx.navigateBack({
			delta: 3   
		})
	}
})