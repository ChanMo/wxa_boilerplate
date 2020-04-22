// pages/notices/notices.js
import { network} from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
    loading: false
  },

  onLoad: function(options) {
    this.getData(0)
  },
  async getData(offset) {
    // 社区公告
		let that = this
    network('get', `/tinypages/?communities=1&limit=5`, '', async(res) => {
			let list = offset==0?[]:that.data.noticeList
			list = list.concat(res.results)
      this.setData({
				noticeList: list,
				offset: offset+5
      })
    })
  },
  onPullDownRefresh() {
    this.getData(0).then(() => wx.stopPullDownRefresh())
  }
})