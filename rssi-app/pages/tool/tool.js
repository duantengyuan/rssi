	export default {
		data() {
			return {
				rssi: '',
				showStop:false,
				timer : null,
				distance: 0,
				rssiList:[],
				showPosition:false,
				showRssi:false,
				showRssiList:false
			}
		},
		onLoad() {
		this.judgePlatform() // 网页测试开,打包时解掉注释
		},
		watch:{
			'rssi'(val){
				if(val){
					this.showRssi = true
				}else{
					this.showRssi = false
				}
			},
			'rssiList'(val){
				if(val.length>0){
					this.showRssiList = true
				}else{
					this.showRssiList = false
				}
			}
		},
		methods: {
			// 计算距离
			distanceComp(rssi){
				this.stopRssi()
				let distance = -1.0
				if(rssi !== 0){
					distance = Math.pow(10,((-rssi-30)/(10*2)))
				} else {
					distance = -1.0
				}
				return distance
			},
			///////
			
		 judgePlatform(){  
			switch ( plus.os.name ) {  
				case "Android":  
				// Android平台: plus.android.*  
				break;  
				case "iOS":  
				// iOS平台: plus.ios.*  
				break;  
				default:  
				// 其它平台  
				break;  
				}  
			},
			getWifiList(){
				this.stopRssi()
				var main = plus.android.runtimeMainActivity(); //获取activity  
				var Intent = plus.android.importClass('android.content.Intent');  
				var Settings = plus.android.importClass('android.provider.Settings');  
				var intent = new Intent(Settings.ACTION_WIFI_SETTINGS);//可设置表中所有Action字段  
				main.startActivity(intent);
			},
			 getRssi(){
				var Context = plus.android.importClass("android.content.Context");
				var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
				var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
				var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");
				var wifiInfo = wifiManager.getConnectionInfo();
				// var ssid = wifiInfo.getSSID() || '';
				this.rssi = wifiInfo.getRssi()
			},
			moreRssi(){
				clearInterval(this.timer)
				this.showStop = true
				this.timer = setInterval(()=>{
					this.getRssi()
					this.rssiList.push(this.rssi)
				},1000)
			},
			stopRssi(){
				clearInterval(this.timer)
				this.showStop = false
			},
			clearRssi(){
				this.rssi = null
			},
			clearRssiList(){
				this.rssiList = []
			}
		}
	}
