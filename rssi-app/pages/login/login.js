	export default {
		data() {
			return {
				showRegistered:false,
				otherLogin:false,
				name:'',
				pwd:'',
				buffer:{
					n:'',
					p:''
				},
				meaasge:'',
			}
		},
		onLoad() {
			this.buffer.n = uni.getStorageSync("username") || '';
			this.buffer.p = uni.getStorageSync("userpwd") || '';
			if(this.buffer.n !=='' && this.buffer.p !==''){
				this.name = this.buffer.n
				this.pwd = this.buffer.p
				this.otherLogin = true
			} else {
				this.otherLogin = false
			}
		},
		created(){
			
		},
		methods: {
			registered(){
				this.meaasge = ''
				this.name = ''
				this.pwd = ''
				this.showRegistered = !this.showRegistered
			},
			haveDataLogin(){
				this.meaasge = ''
				const n = uni.getStorageSync("username")
				const p = uni.getStorageSync("userpwd")
				if((this.name === n) && (this.pwd === p)){
					uni.navigateTo({
					    url: '/pages/nav/nav'
					});
				} else {
					this.meaasge = '用户名或密码错误!'
				}
			},
			login(){
				this.meaasge = ''
				if(this.name !=='' && this.pwd !==''){
					uni.setStorageSync("username",this.name);
					uni.setStorageSync("userpwd",this.pwd);
					uni.navigateTo({
					    url: '/pages/nav/nav'
					});
				} else {
					this.meaasge = '用户名或密码不能为空!'
				}
			}
		}
	}
