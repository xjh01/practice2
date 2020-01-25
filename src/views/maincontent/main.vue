<template>
	<el-main>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<router-view id="members_management"></router-view>
	</el-main>
</template>

<script>
	
	export default {
		data() {
			return {};
		},
		methods: {
		}
	};
</script>

<style>
	.el-breadcrumb {
		line-height: 1;
		font-size: 16px;
	}
</style>
