<template>
	<el-header>
		<div>Log</div>
		<h2>后台练习项目</h2>
		<userInfo></userInfo>
	</el-header>
</template>

<script>
	import userInfo from '../../components/userInfo.vue'
	
	export default{
		components: {
			userInfo
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style>
	.el-header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	
</style>
