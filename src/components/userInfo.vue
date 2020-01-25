<template>
	<el-dropdown>
		<div class="userBasicInfo">
			<el-avatar shape="square" :size="50" :src="userInfo.avatarUrl"></el-avatar>
			<div class="username">
				<span>{{ userInfo.name }}</span>
				<i class="el-icon-arrow-down el-icon--down"></i>
			</div>
			
		</div>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item>
				<span>待批：{{userInfo.work.wait}}</span>
			</el-dropdown-item>
			<el-dropdown-item>狮子头</el-dropdown-item>
			<el-dropdown-item>螺蛳粉</el-dropdown-item>
			<el-dropdown-item>双皮奶</el-dropdown-item>
			<el-dropdown-item>蚵仔煎</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				name: '许峻豪',
				avatarUrl: 'http://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg',
				work: {
					wait: '2'
				}
			}
		};
	}
};
</script>

<style>
	.userBasicInfo{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		width: 100px;
	}
	
	.username{
		display: flex;
		flex-direction: column;
		align-content: flex-end;
		align-items: center;
	}
</style>
