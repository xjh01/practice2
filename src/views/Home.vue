<template>
	<el-container direction="vertical">
		<Header></Header>
		<el-container>
			<Aside></Aside>
			<Main></Main>
		</el-container>
		<Footer></Footer>
	</el-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/views/header/header.vue';
import Footer from '@/views/footer/footer.vue';
import Aside from '@/views/navsider/aside.vue';
import Main from '@/views/maincontent/main.vue';

export default {
	name: 'home',
	components: {
		Header,
		Aside,
		Main,
		Footer
	},
	beforeCreate() {
		console.log('获取localstorage里的user信息')
		let token = localStorage.getItem('token')
		if(!token){
			this.$router.push('/login')
		}
	}
};
</script>
