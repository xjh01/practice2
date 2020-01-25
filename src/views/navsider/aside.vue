<template>
	<el-aside class="nav" width="200px">
		<el-menu :router="true" :unique-opened="true" background-color="#E4E7ED" text-color="#000">
			<el-menu-item index="/">
				<i class="el-icon-s-home"></i>
				<span>控制面板</span>
			</el-menu-item>
			<el-submenu v-for="(menu,index) in menus" :index="menu.index" :key="index">
				<template slot="title" class="menuTitle">
					<i :class="menu.iconClass"></i>
					<span>{{menu.title}}</span>
				</template>
				<el-menu-item v-for="item in menu.children" :index="item.index" :key="item.index" style="color: #606266;">{{item.title}}</el-menu-item>
			</el-submenu>
		</el-menu>
	</el-aside>
</template>

<script>
	import Vue from 'vue'
	
	export default{
		data(){
			return{
				menus: undefined
			}
		},
		methods: {
			//从json数据获取导航条目录
			getAsideNav() {
				Vue.axios.get('http://localhost:8080/data/asideNav.json')
				.then(response => {
					this.menus = response.data.menus
				})
				.catch(error => console.log(error))
			}
		},
		created() {
			this.getAsideNav()
		}
		
	}
</script>

<style>
</style>
