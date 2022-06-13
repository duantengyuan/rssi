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
	</view>
</template>

<script src="./pro1.js"></script>
<style src="./pro1.scss" lang="scss" scoped></style>
