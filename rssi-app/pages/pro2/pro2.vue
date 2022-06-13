<template>
	<view class="content">
		<div class="houseCard" v-if="showPosition">
			<div class="card">
				<div class="house">
					<div class="people" :style="style">
						<div class="cont">
							<div class="icon"></div>
							<div class="ttt">({{userCoordinates[0]}},{{userCoordinates[1]}})</div>
						</div>
					</div>
					<div class="ap ap1">AP1 (0,0)</div>
					<div class="ap ap2">AP2 (7.8,0)</div>
					<div class="ap ap3">AP3 (0,9.6)</div>
					<div class="ap ap4">AP4 (7.8,9.6)</div>
					<img src="../../static/bgs.jpg" alt="">
				</div>
				<div class="dataCont">
					用户坐标：({{userCoordinates[0]}},{{userCoordinates[1]}})
				</div>
				<div class="close" @click="closeShow">关闭</div>
			</div>
		</div>
		<div class="inputList">
			<input type="text" v-model="inList[0]"  placeholder="切换wifi测量 RSSI 1 (或手动输入)" >
			<input type="text" v-model="inList[1]"  placeholder="切换wifi测量 RSSI 2 (或手动输入)" >
			<input type="text" v-model="inList[2]"  placeholder="切换wifi测量 RSSI 3 (或手动输入)" >
			<input type="text" v-model="inList[3]"  placeholder="切换wifi测量 RSSI 4 (或手动输入)" >
			<div class="userCoordinates" v-if="userCoordinates[0]">用户坐标： ({{userCoordinates[0]}},{{userCoordinates[1]}})</div>
			<div class="showHouseBtn" v-if="showShowHouseBtn" @click="showPosition = true">显示位置</div>
		</div>
		<div class="msg">{{msg}}</div>
		<div class="btnlist">
			<div class="btn" @click="getWifiList">切换AP</div>
			<div class="btn" @click="getRssi">获取单次RSSI</div>
			<div class="btn" @click="componentClcik">计算坐标</div>
		</div>
		
		
<!-- 		<div class="aside">
			<div class="getBtn btn" @click="getWifiList">切换WIFI</div>
			<div class="inputBtn btn" @click="saveRssi">存取RSSI</div>
			<div class="complateBtn btn" @click="initData">计算位置</div>
		</div>
		<div class="main">
			<div class="inputList">
				<div class="input">
					<input type="text" v-model="K"  placeholder="精度(正整数)" >
				</div>
				<div class="input">
					<input type="text" v-model="inList[0]"  placeholder="RSSI 1" >
					<div class="text">>> 距离：<span>{{this.distence[0]}}</span></div>
				</div>
				<div class="input">
					<input type="text" v-model="inList[1]"  placeholder="RSSI 2" >
					<div class="text">>> 距离：<span>{{this.distence[1]}}</span></div>
				</div>
				<div class="input">
					<input type="text" v-model="inList[2]"  placeholder="RSSI 3" >
					<div class="text">>> 距离：<span>{{this.distence[2]}}</span></div>
				</div>
				<div class="input">
					<input type="text" v-model="inList[3]"  placeholder="RSSI 4" >
					<div class="text">>> 距离：<span>{{this.distence[3]}}</span></div>
				</div>
			</div>
			<div class="msg">{{msg}}</div>
			<div class="componentClcik" @click="componentDistance">计算距离</div>
			<div class="componentClcik" @click="cleanInput">清空</div>
			<div class="houseCard">
				<div class="zuobiao">坐标：X{{coordinate.x}} /// Y{{coordinate.y}}</div>
				<div class="card">
					<div class="house">
						<div class="people" :style="style">
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</view>
</template>
<script src="./pro2.js"></script>
<style src="./pro2.scss" lang="scss" scoped></style>
