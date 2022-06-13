<template>
	<view class="content">
		<div class="rssiCont">
			<div class="rssiOnce">
				<div class="title">单次RSSI</div>
				<div class="txt">
				<div class="clear" @click="clearRssi" v-if="showRssi">清除</div>
				{{rssi}}
				</div>
			</div>
			<div class="rssiList">
			<div class="title">持续测量RSSI</div>
			<div class="txt">
				<div class="clear" @click="clearRssiList" v-if="showRssiList">清除</div>
				<span v-for="(li,index) in rssiList" :key="index">{{li}}</span>
			</div>
			</div>
		</div>
		<div class="btnlist">
			<div class="btn" @click="getWifiList">切换AP</div>
			<div class="btn" @click="getRssi">获取单次RSSI</div>
			<div class="btn" @click="moreRssi" v-if="!showStop">持续获取RSSI</div>
			<div class="btn stopBtn" @click="stopRssi" v-else>STOP</div>
		</div>
	</view>
</template>

<script src="./tool.js"></script>
<style src="./tool.scss" lang="scss" scoped></style>
