// pages/fresh/fresh.js
import {
  network
} from '../../utils/http.js'
Page({
  data: {
    tab_active: 1,
		freshValue:null,
    storList: [],
    offset: 0,
    categoryList: [{
        id: 1,
        name: '餐饮'
      },
      {
        id: 2,
        name: '娱乐'
      }
    ],
    category: 1,
    search:null
  },
  onShow: function(options) {
    this.getData(0, this.data.category)
    this.getFresh()
  },
  getFresh(){
    // 抢新达推荐
    network('get', `/stores/?limit=3&is_top=1`, '', async (res) => {
      this.setData({
        newList: res.results
      })
    })
  },
  getData(offset, category = 1, search = '') {
    let that = this
    if (search) search = `search=${search}`
    network('get', `/stores/?offset=${offset}&limit=10&${search}&category=${category}&is_top=0`, '', (res) => {
			console.log(res.results)
      let list = offset == 0 ? [] : that.data.storList
      list = list.concat(res.results)
      this.setData({
        storList: list,
        offset: offset + 10
      })
    })
  },
  onPullDownRefresh() {
		this.setData({ freshValue:null})
		this.getData(0, this.data.category)
		this.getFresh()
    wx.stopPullDownRefresh()
  },
	onReachBottom() {
		this.getFresh()
    this.getData(this.data.offset, this.data.category)
  },
	changeTab(e){
		let id = e.currentTarget.dataset.id
		this.getData(0, id)
		this.getFresh()
		this.setData({ category:id})
  },
  changeInput(e) {
    if (!e.detail.value){
			this.getData(0, this.data.category)
			this.getFresh()
    }
   
  },
  submit(e){
    this.getData(0, this.data.category,e.detail.value)
  },
	onShareAppMessage(){
		
	}
})