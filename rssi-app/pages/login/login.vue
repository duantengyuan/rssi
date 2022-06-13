<template>
	<view class="content">
		<image src="../../static/0924.jpg" mode="" class="imgbg"></image>
		<div class="registerCard" v-if="showRegistered">
			<div class="card">
				<image src="../../static/res.png" mode=""></image>
				<div class="inputList">
					<input v-model="name" type="text" class="name" placeholder="请输入用户名">
					<input v-model="pwd" type="password" class="pwd" placeholder="请输入密码">
				</div>
				<div class="btnlist">
					<div class="msg">{{meaasge}}</div>
					<div class="btn" @click="haveDataLogin" v-if="otherLogin">注册并登录</div>
					<div class="btn" @click="login" v-else>注册并登录</div>
					<div class="btn" @click="registered">返回登录</div>
				</div>
			</div>
		</div>
		<div class="loginCont" v-else>
			<image src="../../static/login.png" mode=""></image>
			<div class="inputList">
				<input v-model="name" type="text" class="name" placeholder="请输入用户名">
				<input v-model="pwd" type="password" class="pwd" placeholder="请输入密码">
			</div>
			<div class="btnlist">
				<div class="msg">{{meaasge}}</div>
				<div class="btn" @click="haveDataLogin" v-if="otherLogin">登录</div>
				<div class="btn" @click="meaasge = '请先注册!'" v-else>登录</div>
				<div class="btn" @click="registered">注册</div>
			</div>
		</div>
	</view>
</template>
<script src="./login.js"></script>
<style src="./login.scss" lang="scss" scoped></style>
