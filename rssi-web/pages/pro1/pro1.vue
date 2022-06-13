<template>
	<view class="content">
		<div class="left">
			<div class="inputList">
				<input type="text" v-model="inList[0]"  placeholder="RSSI 1 输入" >
				<input type="text" v-model="inList[1]"  placeholder="RSSI 2 输入" >
				<input type="text" v-model="inList[2]"  placeholder="RSSI 3 输入" >
				<input type="text" v-model="inList[3]"  placeholder="RSSI 4 输入" >
			</div>
			<div class="msg">{{msg}}</div>
			<div class="btnlist">
				<div class="btn" @click="componentClcik">计算坐标</div>
				<div class="btn" @click="clearClcik">重置</div>
			</div>
		</div>
		<div class="houseCard">
			<div class="card">
				<div class="house">
					<div class="people" :style="style" v-if="style !== ''">
						<div class="cont">
							<div class="icon"></div>
							<div class="ttt">({{userCoordinates[0]}},{{userCoordinates[1]}})</div>
						</div>
					</div>
					<div class="ap ap1">AP1 (0,0)</div>
					<div class="ap ap2">AP2 (7.8,0)</div>
					<div class="ap ap3">AP3 (0,9.6)</div>
					<div class="ap ap4">AP4 (7.8,9.6)</div>
					<img src="/static/bgs.jpg" alt="">
				</div>
			</div>
		</div>
	</view>
</template>

<script src="./pro1.js"></script>
<style src="./pro1.scss" lang="scss" scoped></style>
