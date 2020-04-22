// component/list/list.js
Component({
	properties: {
		list:{
			type:Array,
			value:[]
		}
	},
	data: {

	},
	methods: {
		links(e){
			let path = e.currentTarget.dataset.path
			// 选择地址
			if (path =='address'){
				wx.chooseAddress({
					success(res){
						console.log(res)
					},fail(err){
						console.log(err)
					}
				})
			}
			else if (path){
				wx.navigateTo({
					url: path
				})
			}else{

			}
		}
	}
})
