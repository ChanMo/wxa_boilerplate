// pages/league/league.js
import {
  network
} from '../../utils/http.js'
Page({
  data: {
    postsList: [],
    offset: 0,
    loading: true,
    submit: false,
    leaveId: null,
    content: '',
    disabled:false
  },
  onLoad: function() {
    this.getData(0)
  },
  async getData(offset) {
    let that = this
    await network('get', `/posts/?offset=${offset}&limit=5`, '', (res) => {
			let list = offset == 0 ? [] : that.data.postsList
			list = list.concat(res.results)
			if (res.results.length == 0) offset = offset
			else offset = offset + 5
      this.setData({
        postsList: list,
        offset: offset
      })
    })
    that.setData({
      loading: false
    })
  },
  onPullDownRefresh() {
    this.getData(0)
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    this.getData(this.data.offset)
  },
  // 点赞
  likes(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let list = that.data.postsList
    network('post', `/posts/${id}/like/`, {}, (res) => {
			list.map((item,index)=>{
				if(item.id==id){
					list[index].is_like = !list[index].is_like
					if (list[index].is_like){
						list[index].likes = list[index].likes+1
					}else{
						list[index].likes = list[index].likes - 1
					}
					that.setData({postsList:list})
				}
				
				// that.setData({})
			})
    })
  },
  leaveWord(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      submit: true,
      leaveId: id
    })
  },
  close() {
    this.setData({
      submit: false
    })
  },
  changeInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  submit() {
    let that = this
    this.setData({ disabled: true, submit:false})
    network('post', `/comments/`, {
      content: that.data.content,
      source_pk: that.data.leaveId,
      source_name: 'posts.post'
    }, (res) => {
      console.log(res)
      wx.showToast({
        title: '评价成功',
      })
      that.setData({ disabled:false})
    })
  }
})