<template>
	<el-card class="login">
		<div slot="header" class="title">练习后台管理平台</div>
		<el-form :model="userLogin" class="loginForm" label-position="right">
			<el-form-item label="用户名 :" >
				<el-input style="width: 100px;" v-model="userLogin.userName"></el-input>
			</el-form-item>
			<el-form-item label="密码 :">
				<el-input type="password" style="width: 100px;" v-model="userLogin.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit(userLogin)">登录</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				userLogin:{
					userName: '',
					password: ''
				}
			}
		},
		methods:{
			submit(){
				localStorage.setItem('token','123')
				this.$router.push('/')
			}
		}
	}
</script>

<style>
	.login{
		width: 400px;
		margin: 100px auto;
	}
	
	.el-form-item{
		display: flex;
		justify-content: center;
	}
	
	.el-form-item__label{
		width: 70px;
	}
	
	.title{
		text-align: center;
		font-weight: 600;
		background-color: brown;
		color: white;
	}
</style>
