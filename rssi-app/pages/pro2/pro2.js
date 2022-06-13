import data from './data.js'
export default {
	data() {
		return {
			userCoordinates:[],
			showPosition:false,
			showShowHouseBtn:false,
			i:0,
			K:5, //- 精度
			inList: [],
			distence:[],
			coordinate:{
			  x:'',
			  y:''
			},
			rssi:'',
			style:'',
			msg:'',
			arr: data.arr
		}
  },
  onLoad() {
  this.judgePlatform()
  // this.initData()
  },
  methods: {
	  closeShow(){
	  	this.showPosition = false
	  	this.showShowHouseBtn = false
	  	this.inList=[]
	  	this.userCoordinates = []
	  	this.msg = ''
	  },
  		/////////
  		componentClcik(){
  			if(this.inList[1]&&this.inList[2]&&this.inList[3]&&this.inList[0]){
  				this.initData()
  			} else {
  				this.msg = 'rssi值不能为空！'
  			}
  		},
		closeShow(){
			this.showPosition = false
			this.showShowHouseBtn = false
			this.inList=[]
			this.userCoordinates = []
			this.msg = ''
		},
  		// 计算距离
  		distanceComp(rssi){
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
		// 切换wifi
		getWifiList(){
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
  			this.rssi = wifiInfo.getRssi()
  			this.inList.push(this.rssi)
  		},
		//////////
		// 算法
		// 计算欧式距离
	 computedistance(n,avector,bvector){
		   let dist=0.0;
		    for(let i=0;i<n;i++){
				dist+=Math.pow(avector[i]-bvector[i],2);
			}
			dist = Math.sqrt(dist)
		    return dist;
		},
		//冒泡排序。
	 bublesort(n,a,choice){
		    let k = null;
		    for(let j=0;j<n;j++){
				for(let i=0;i<n-j-1;i++){
				    if(choice===0){
				        if(a[0][i]>a[0][i+1]){
				            k=a[0][i];
				            a[0][i]=a[0][i+1];
				            a[0][i+1]=k;
				            k=a[1][i];
				            a[1][i]=a[1][i+1];
				            a[1][i+1]=k;
							k=a[2][i];
							a[2][i]=a[2][i+1];
							a[2][i+1]=k;
				        }
				    } else if (choice===1){
				        if(a[1][i]>a[1][i+1]){
				            k=a[0][i];
				            a[0][i]=a[0][i+1];
				            a[0][i+1]=k;
				            k=a[1][i];
				            a[1][i]=a[1][i+1];
				            a[1][i+1]=k;
							k=a[2][i];
							a[2][i]=a[2][i+1];
							a[2][i+1]=k;
				        }
				    }
				}
			}
		},
		initData(){
			let D = 6
			let N = 45
		    let karray = [
				[],
				[],
				[]
			] //  K近邻点的距离及其标签
			
			let dist = null
			let maxdist = null
		
			//先计算前K个欧式距离存放在karray[3][K]中作为初始数据。
		// while(1) {
			for(let i=0;i<this.K;i++){
				karray[0][i]=this.computedistance(D-2,this.inList,this.arr[i]);
				karray[1][i]=this.arr[i][D-2];
				karray[2][i]=this.arr[i][D-1];
			}
			this.bublesort(this.K,karray,0);//先将karray[3][K]中的数据进行排序，从小到大。
			maxdist = karray[0][this.K-1]; //初始化k近邻数组的距离最大值
		   //这个循环用来将45组数据中的最小的5个欧式距离找出来
			for(let i=this.K;i<N;i++){
				dist = this.computedistance(D-2,this.inList,this.arr[i]);
				if(dist<maxdist){
					for(let j=0;j<this.K;j++){
						if(dist<karray[0][j]){
							for(let k=this.K-1;k>j;k--){ //j后元素复制到后一位，为插入做准备
								karray[0][k]=karray[0][k-1];
								karray[1][k]=karray[1][k-1];
								karray[2][k]=karray[2][k-1];
							}
							karray[0][j] = dist;  //插入到j位置
							karray[1][j] = this.arr[i][D-2];
							karray[2][j] = this.arr[i][D-1];
							break;  //不比较karray后续元素
						}
					}
				}
				maxdist = karray[0][this.K-1];
			}
		
			let x1=0
			let y1=0;
			for(let i=0;i<this.K;i++){
				x1+=karray[1][i];
				y1+=karray[2][i];
			}
			if(x1){
				this.userCoordinates = [(x1/5).toFixed(2),(y1/5).toFixed(2)]
				console.log("最终计算的坐标为：",this.userCoordinates)
				this.style = `left: ${this.userCoordinates[0]*30}px;top: ${this.userCoordinates[1]*30}px;`
				this.showShowHouseBtn = true
				this.msg = ''
			} else {
				this.msg = '获取的RSSI找不到交叉点!'
			}

	}
},
}
