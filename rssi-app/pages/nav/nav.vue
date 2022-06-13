<template>
	<view class="content">
		<div class="navCard">
			<div class="navList">
				<div class="row">
					<div class="navBox" @click="goPath('tool')">
						<div class="box">
							<image src="../../static/tool.png" alt="">
							<div class="tt">测算工具</div>
						</div>
					</div>
					<div class="navBox" @click="goPath('pro1')">
						<div class="box">
							<image src="../../static/comp1.png" alt="">
							<div class="tt">三边定位法</div>
						</div>
					</div>
					<div class="navBox" @click="goPath('pro2')">
						<div class="box">
							<image src="../../static/comp2.png" alt="">
							<div class="tt">指纹定位法</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="navBox" @click="goPath('about')">
						<div class="box">
							<image src="../../static/about.png" alt="">
							<div class="tt">关于我们</div>
						</div>
					</div>
					<div class="navBox" @click="goPath('login')">
						<div class="box">
							<image src="../../static/logout.png" alt="">
							<div class="tt">注销用户</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script src="./nav.js"></script>
<style src="./nav.scss" lang="scss" scoped></style>
