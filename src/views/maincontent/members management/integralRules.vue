<template>
	<div>
		<el-table :data="integralTable">
			<el-table-column type="index" label="编号"></el-table-column>
			<el-table-column prop="name" label="规则名称"></el-table-column>
			<el-table-column prop="integral" label="积分值">
				<template slot-scope="scope">
					<span v-if="!scope.row.isEdit">{{scope.row.integral}}</span>
					<el-input v-else v-model="scope.row.integral"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="limit" label="每日上限(次)"></el-table-column>
			<el-table-column prop="participants" label="当天参与人数"></el-table-column>
			<el-table-column prop="sum" label="总积分"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间"></el-table-column>
			<el-table-column label="是否显示">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.isShow"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button icon="el-icon-edit" size="small" @click="handleEdit(scope)"></el-button>
					<el-button icon="el-icon-document" size="small"></el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import xaxios from "../../../components/xaxios.js"
	export default{
		data() {
			return {
				integralTable: []
			}
		},
		methods:{
			handleEdit(scope){
				scope.row.isEdit = !scope.row.isEdit
			}
		},
		beforeMount() {
			xaxios('get', 'integral')
			.then(response => {
				console.log(response)
				this.integralTable = response.data
			}).catch(error => console.log(error))
		}
	}
</script>

<style>
</style>
