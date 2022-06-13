	export default {
		data() {
			return {

			}
		},
		created(){
			if(!uni.getStorageSync("username")){
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			} 
		},
		methods: {
			goPath(path){
				if(path === 'login'){
					uni.setStorageSync("username",null);
					uni.setStorageSync("userpwd",null);
				}
				uni.navigateTo({
				    url: `/pages/${path}/${path}`
				});
			}
		}
	}
