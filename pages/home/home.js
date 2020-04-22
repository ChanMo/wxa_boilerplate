// pages/home/home.js
import {
  network
} from '../../utils/http.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    bannerIndex: 0
  },
  onLoad: function(options) {
		if (options.code) {
      this.setData({
				code: options.code
      })
    }
    this.getData()
  },
  onPullDownRefresh() {
    this.getData().then(() => wx.stopPullDownRefresh())
  },
  async getData() {
    // 轮播图
    network('get', `/sliders/home/`, '', async(res) => {
      this.setData({
        bannerList: res
      })
    })
  },
  changeBanner(e) {
    this.setData({
      bannerIndex: e.detail.current
    })
  },
  // 获取用户信息
  getUsers() {
    let that = this
    network('get', `/accounts/profile/`, '', async(res) => {
			if (!res.get_parent){
				that.pyramid()
			}
      if(res.is_new){
        this.getTicket()
      }
      that.setData({
        user: res,
        loading: false
      })
    })
  },
  pyramid() {
		let code = this.data.code
		if (!code) return
		let that = this
    network('post', `/pyramid/set/`, {
			code:code
		}, async(res) => {

    },false,false)
  }
})