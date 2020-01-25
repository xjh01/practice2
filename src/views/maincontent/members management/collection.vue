<template>
	<el-row type="flex" justify="space-around">
		<el-col :span="8">
			<el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
				<el-tab-pane label="精选商品" name="goods"></el-tab-pane>
				<el-tab-pane label="品质服务" name="server"></el-tab-pane>
				<el-row>
					<el-col :span="8" :offset="1">
						<el-input type="text" :placeholder="tabLabel" v-model="searchVal"></el-input>
					</el-col>
				</el-row>
				<el-table ref="table" :data="filterTableData" @select="handleSelection" @select-all="handleSelection">
					<el-table-column prop="name" label="名称"></el-table-column>
					<el-table-column prop="price" label="价格"></el-table-column>
					<el-table-column label="操作" type="selection"></el-table-column>
				</el-table>
			</el-tabs>
		</el-col>
		<el-col :span="12">
			<el-row class="getMemberInfo">
				<el-col>
					<el-button type="danger" size="small">读卡</el-button>
					<el-button type="primary" size="small" @click="search">搜索</el-button>
					<el-divider></el-divider>
				</el-col>
			</el-row>
			<div v-if="user" class="user">
				<el-form :model="user">
					<el-row>
						<el-col :span="4" style="padding-top: 7px;">
							<el-form-item>
								<el-avatar shape="square" :size="70" :src="user.avatar"></el-avatar>
							</el-form-item>
								
						</el-col>
						<el-col :span="6">
							<el-form-item label="会员姓名:">
								<span>{{user.cname}}</span>
							</el-form-item>
							<el-form-item label="会员卡号:">
								<span>{{user.cardNo}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="手机号:">
								<span>{{user.cellphone}}</span>
							</el-form-item>
							<el-form-item label="会员级别:">
								<span>{{user.level}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="账户余额:">
								<span>{{user.accountBalances}}</span>
							</el-form-item>
							<el-form-item label="积分:">
								<span>{{user.points}}</span>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div v-for="(item,index) in multipleSelection" :key="index" class="goodsAndServer">
				<el-form :model="item">
					<el-row>
						<el-col :span="6">
							<el-form-item label="名称:">
								<span>{{item.name}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="价格:">
								<span>{{item.price}}</span>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="total" v-show="multipleSelection.length>0">
				<el-row :gutter="2" >
					<el-col :span="6">
						<span>合计：{{sum}}</span>
					</el-col>
					<el-col :span="6">
						<span>共：{{count}} 件</span>
					</el-col>
				</el-row>
			</div>
			
		</el-col>
		<el-dialog title="会员信息" :visible.sync="dialogTableVisible">
			<el-table :data="members" stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
				<el-table-column property="cname" label="姓名" width="100" align="center"></el-table-column>
				<el-table-column property="cellphone" label="手机号" width="200" align="center"></el-table-column>
				<el-table-column property="cardNo" label="会员卡号" width="150" align="center"></el-table-column>
				<el-table-column property="level" label="会员级别" width="100" align="center"></el-table-column>
				<el-table-column property="accountBalances" label="账户余额" width="150" align="center"></el-table-column>	
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope">
						<el-button @click="choose(scope.row)" type="text" size="small">选择</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-row>
				<el-col :span="10" :offset="12">
					<el-pagination layout="prev, pager, next" :total="80" @current-change="handleCurrentChange"></el-pagination>
				</el-col>
			</el-row>
		</el-dialog>
	</el-row>
</template>

<script>
	import axios from 'axios'
	
	
export default {
	data() {
		return {
			searchVal: '',
			activeName: 'goods',
			tableData: [],
			tabLabel: '请输入精选商品名称',
			dialogTableVisible: false,
			members: [],
			user: undefined,
			loading: true,
			goods: [{
				name: '测试商品一',
				price: 100
			},{
				name: '测试商品二',
				price: 200
			},{
				name: '测试商品三',
				price: 300
			}],
			server: [{
				name: '测试服务一',
				price: 50
			},{
				name: '测试服务二',
				price: 60
			},{
				name: '测试服务三',
				price: 70
			}],
			multipleSelection: [],
			page: 0
		};
	},
	methods: {
		handleClick(tab) {
			if(tab.name === 'server'){
				this.tableData = this.server
			}else{
				this.tableData = this.goods
			}
			this.tabLabel = '请输入' + tab.label + '名称'
		},
		search() {
			this.dialogTableVisible = true;
			let pageUrl = 'http://localhost:3000/members?_page=' + this.page + '&_limit=10'
			axios.get(pageUrl)
			.then(response => {
				this.loading = false
				this.members =response.data
			})
			.catch(error => {console.log(error)})
		},
		choose(row){
			this.user = row
			this.dialogTableVisible = false
		},
		/* handleSelectionChange(val){
			this.multipleSelection = val
		}, */
		handleSelection(val){
			if(!this.user){
				this.$message({
					message: '请先读卡或者搜索会员！',
					type: 'warning',
					duration: 2000
				})
				this.$refs.table.clearSelection()
			}else{
				this.multipleSelection = val
			}
			console.log(this.multipleSelection)
		},
		handleCurrentChange(val){
			let pageUrl = 'http://localhost:3000/members?_page=' + val + '&_limit=10'
			axios.get(pageUrl)
			.then(response => {
				this.members =response.data
			})
			.catch(error => {console.log(error)})
		}
		
		
	},
	computed: {
		sum() {
			let sum = 0;
			this.multipleSelection.forEach(item => {
				sum += item.price 
			})
			return sum
		},
		count(){
			return this.multipleSelection.length
		},
		filterTableData(){
			return this.tableData.filter(item => {
				return item.name.indexOf(this.searchVal) > -1
			})
		}
	},
	beforeMount() {
		this.tableData = this.goods
	}
};
</script>

<style>
	body{
		margin: 0;
	}
	
	.el-form-item {
		/* width: 160px; */
		align-items: center;
		margin-bottom: 0;
	}

	.el-dialog__header{
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #98a0a1;
	}
	
	.el-dialog__body{
		padding-top: 20px;
	}
	
	.el-dialog{
		width: 820px;
	}
	
	.el-form-item__label{
		width: auto;
	}
	
	.user{
		border: #2C3E50;
		border-radius: 2px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) ;
	}
	
	.goodsAndServer{
		border: #2C3E50;
		border-radius: 2px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) ;
		margin-top: 10px;
	}
	
	.total{
		margin-top: 20px;
		border-top: 1px solid #000 ;
		font: 18px bold
	}
	
	.el-pagination{
		margin-top: 7px;
	}
</style>
