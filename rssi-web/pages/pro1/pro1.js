export default {
	data() {
		return {
			rssi:'null',
			distance: 0,
			rssiList:[],
			msg:'',
			inList:[],
			userCoordinates:[],
			showPosition:false,
			showShowHouseBtn:false,
			style:''
		}
	},
	onLoad() {
	// this.judgePlatform()
	// this.initData()
	},
	methods: {
		clearClcik(){
			this.inList=[]
			this.userCoordinates = []
			this.msg = ''
			this.style = ''
		},
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
				console.log(222)
				this.initData(this.inList[1], this.inList[2], this.inList[3], this.inList[0])
			} else {
				console.log(333)
				this.msg = 'rssi值不能为空！'
			}
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
		setPoint(P,a,b,c){
			P.X=a
			P.Y=b
			P.Distance=c
			return P
		},
		// 求两个圆的交点的函数
		GetPiontByThree(p1,p2,p3){
			let P1 = {
			X:null,
			Y:null,
			Distance:null
			}
			P1 = this.setPoint(P1,100000,100000,100000)
			let x12=0,y12=0
			let x121=0,x122=0,y121=0,y122=0,y1211=0,y1212=0,y1222=0,y1221=0
			// console.log('p-----',p1,p2,p3,'------p')
			if(p2.Y === p1.Y){
				x121=(Math.pow(p1.Distance,2)-Math.pow(p2.Distance,2)+Math.pow(p2.Y,2)-Math.pow(p1.Y,2)+Math.pow(p2.X,2)-Math.pow(p1.X,2))/((p2.X-p1.X)*2);
				x122=(Math.pow(p1.Distance,2)-Math.pow(p2.Distance,2)+Math.pow(p2.Y,2)-Math.pow(p1.Y,2)+Math.pow(p2.X,2)-Math.pow(p1.X,2))/((p2.X-p1.X)*2);
				y121=p1.Y+Math.sqrt(Math.pow(p1.Distance,2)-Math.pow((x121-p1.X),2));
				y122=p1.Y-Math.sqrt(Math.pow(p1.Distance,2)-Math.pow((x122-p1.X),2));
				
				if (Math.pow((x121-p3.X),2)+Math.pow((y121-p3.Y),2)>=Math.pow((x122-p3.X),2)+Math.pow((y122-p3.Y),2)){
					x12 = x122;
					y12 = y122;
					P1 = this.setPoint(P1,x12, y12, 0);
				} else {
					x12 = x121;
					y12 = y121;			
					P1 = this.setPoint(P1,x12, y12, 0);
				}
				P1.X = x12;
				P1.Y = y12;	
			} else {
				let A12=(Math.pow(p1.Distance,2)-Math.pow(p2.Distance,2)+Math.pow(p2.Y,2)+Math.pow(p1.Y,2)+Math.pow(p2.X,2)-Math.pow(p1.X,2)+2*p1.Y*p2.Y)/((p2.Y-p1.Y)*2);
				let B12=(p2.X-p1.X)/(p2.Y-p1.Y);
				let C12=Math.pow(p1.Distance,2);
				let D12=Math.pow(B12,2)+1;
				let E12=2*A12*B12+2*p1.X;
				let F12=(Math.pow(p1.X,2)-C12)+Math.pow(A12,2);
				if(D12!=0){
					let T12=Math.pow(E12,2)-4*D12*F12;
			if(T12>=0){
				x121=(E12+Math.sqrt(T12))/(D12*2);
				x122=(E12-Math.sqrt(T12))/(D12*2);
				
				y121=Math.sqrt(Math.pow(p1.Distance,2)-Math.pow((x121-p1.X),2))+p1.Y;
				y122=Math.sqrt(Math.pow(p1.Distance,2)-Math.pow((x122-p1.X),2))+p1.Y;
				
				
				let x1=0,x2=0,x3=0,y1=0,y2=0,y3=0;
					if (Math.pow((x121-p3.X),2)+Math.pow((y121-p3.Y),2)>=Math.pow((x122-p3.X),2)+Math.pow((y122-p3.Y),2))
					{
						x12 = x122;
						y12 = y122;
						P1 = this.setPoint(P1,x12, y12, 0);
					}
					else
					{
						x12 = x121;
						y12 = y121;	
						P1 = this.setPoint(P1,x12, y12, 0);
					}
					
				}
				} else {
					if(E12!=0){
						x121=F12/E12;
						x122=F12/E12;
						y1211=(-1)*Math.sqrt(Math.pow(p1.Distance,2)-Math.pow((x121-p1.X),2))+p1.Y;
						y1221=(-1)*Math.sqrt(Math.pow(p2.Distance,2)-Math.pow((x122-p2.X),2))+p2.Y;
						y1212=Math.sqrt(Math.pow(p1.Distance,2)-Math.pow((x121-p1.X),2))+p1.Y;
						y1222=Math.sqrt(Math.pow(p1.Distance,2)-Math.pow((x122-p1.X),2))+p2.Y;
						if(y1211<=(p1.Y+p1.Distance)&&y1211>+(p1.Y-p1.Distance)){
							y121=y1211;
						}
						else{y121=y1212;}
						if(y1222<=(p1.Y+p1.Distance)&&y1222>=(p1.Y-p1.Distance)){
							y122=y1222;
						}
						else{y122=y1221;}
						let x1,x2,x3,y1,y2,y3;
							if (Math.pow((x121-p3.X),2)+Math.pow((y121-p3.Y),2)>=Math.pow((x122-p3.X),2)+Math.pow((y122-p3.Y),2)){
								x12 = x122;
								y12 = y122;
								P1 = this.setPoint(P1,x12, y12, 0);

								}
							else{
								x12 = x121;
								y12 = y121;	
								P1 = this.setPoint(P1,x12, y12, 0);
								}
								P1 = this.setPoint(P1,x12, y12, 0);
						}
					else{
						x121=p1.X;
						y121=x121;
						x122=p2.X;
						y122=x122;
						let x1=0,x2=0,x3=0,y1=0,y2=0,y3=0;
							if (Math.pow((x121-p3.X),2)+Math.pow((y121-p3.Y),2)>=Math.pow((x122-p3.X),2)+Math.pow((y122-p3.Y),2)){
								x12 = x122;
								y12 = y122;
								P1 = this.setPoint(P1,x12, y12, 0);
								}
							else{
								x12 = x121;
								y12 = y121;		
								P1 = this.setPoint(P1,x12, y12, 0);
								}
					}
				}
			}
			return P1
		},
		
		
	GetOne(pp1,pp2,pp3){
		// console.log('pp-----',pp1,pp2,pp3,'------pp')

		let pp = {
			X:null,
			Y:null,
			Distance:null
		}
		pp = this.setPoint(pp,100000,100000,100000)
		let flgpoint = []
		flgpoint[0]=this.GetPiontByThree(pp1,pp2,pp3);//求第一个圆和第二个圆的交点，因为圆有两个交点，所以哪个点理第三个圆近取哪个。
		flgpoint[1]=this.GetPiontByThree(pp1,pp3,pp2);//求第一个和第三个的交点，同理上述
		flgpoint[2]=this.GetPiontByThree(pp2,pp3,pp1);//求第二个和第三个的交点，同理上述
		if(flgpoint[0].X<100000&&flgpoint[1].X<100000&&flgpoint[2].X<100000&&flgpoint[0].Y<100000&&flgpoint[1].Y<100000&&flgpoint[2].Y<100000){
			let X1=(flgpoint[0].X+flgpoint[1].X+flgpoint[2].X)/3;
			let Y1=(flgpoint[0].Y+flgpoint[1].Y+flgpoint[2].Y)/3;
			pp = this.setPoint(pp,X1,Y1,0)
		}
		else{
			let X1=100000;
			let Y1=100000;
			pp = this.setPoint(pp,X1,Y1,0)

		}
		return pp;
	
	},
		
	initData(r1,r2,r3,r4){
		let iBeacon=[
			{X:null,Y:null,Distance:null},{X:null,Y:null,Distance:null},{X:null,Y:null,Distance:null},{X:null,Y:null,Distance:null}
		]
		const arr = [
			{
				a : 0,
				b : 0,
				rssi : r1 || -44.0513
				// rssi : r1 || -44.0513
			},
			{
				a : 7.8,
				b : 0,
				rssi : r2 || -44.0000
				// rssi : r2 || -45.0000
			},
			{
				a : 0,
				b : 9.6,
				rssi : r3 || -44.0625
				// rssi : r3 || -47.0625
			},
			{
				a : 7.8,
				b : 9.6,
				rssi : r4 || -44.8044
				// rssi : r4 || -46.8044
			}
		]
		for(let key in arr){
			let a = arr[key].a
			let b = arr[key].b
			console.log('arr[key].rssi',arr[key].rssi)
			let d = this.distanceComp(arr[key].rssi)
			console.log('d',d,key)
			iBeacon[key] = this.setPoint(iBeacon[key], a, b, d)
		}
		console.log("arr",iBeacon)
		// for (let i = 0; i < 4; i++) {
		// 	let a, b, rssi;
		// 	cin >> a >> b >> rssi;
		// 	let d = this.distanceComp(rssi);
		// 	console.log("此点到定位点的距离为",d) 
		// 	iBeacon[i] = this.setPoint(iBeacon[i],a, b, d);
		// }
		
		
		let coordinate = [];
		coordinate[0] = this.GetOne(iBeacon[0],iBeacon[1],iBeacon[2]);
		coordinate[1] = this.GetOne(iBeacon[0],iBeacon[1],iBeacon[3]);
		coordinate[2] = this.GetOne(iBeacon[0],iBeacon[2],iBeacon[3]);
		coordinate[3] = this.GetOne(iBeacon[1],iBeacon[2],iBeacon[3]);
		let sx=0,sy=0;
		let ii=0;
		for(let i=0;i<4;i++){
			if(coordinate[i].X<100000&&coordinate[i].Y<100000){
				sx+=coordinate[i].X;
				sy+=coordinate[i].Y;
				ii++;
			}
			else {
				sx+=0;
				sy+=0;
			}
		}
		//////////////////
		if(ii==0){
			console.log("pause");
		}
		let XX=sx/ii;
		let YY=sy/ii;
		if(XX){
			this.userCoordinates = [XX.toFixed(2),YY.toFixed(2)]
			console.log("最终计算的坐标为：",XX,YY)
			this.style = `left: ${XX*50}px;top: ${YY*50}px;`
			this.showShowHouseBtn = true
			this.msg = ''
		} else {
			this.msg = '获取的RSSI找不到交叉点!'
		}
	}
	}
}
