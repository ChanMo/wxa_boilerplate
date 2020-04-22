// pages/theOrder/theOrder.js
import {network} from '../../utils/http.js'
let timmer;
Page({
	data: {
		order:null,
		number:null
	},
	onLoad: function (options) {
    this.setData({ number: options.order })
    this.getData(options.order)
    timmer = setInterval(() => {
      this.getData(options.order)
    },5000)
	},
  onUnload(){
    clearInterval(timmer)
  },
	getData(order){
		let that = this
		network('get', `/orders/${order}/`,'',(res)=>{
			that.setData({ order:res})
		})
	}
})