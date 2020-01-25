<template>
	<el-table :data="levelsTable">
		<el-table-column type="index" label="编号"></el-table-column>
		<el-table-column prop="levelLabel" label="会员名称">
			<template slot-scope="scope">
				<span v-if = "!scope.row.isEdit">{{scope.row.levelLabel}}</span>
				<el-input v-else v-model="scope.row.levelLabel"></el-input>
			</template>
		</el-table-column>
		<el-table-column prop="price" label="会员价格">
			<template slot-scope="scope">
				<span v-if = "!scope.row.isEdit">{{scope.row.price}}</span>
				<el-input v-else v-model="scope.row.price"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button icon="el-icon-edit" type="primary" size="small" @click="handleEdit(scope)"></el-button>
				<el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(scope)"></el-button>
				<el-button icon="el-icon-top" type="success" size="small" v-if="scope.$index!=0" @click="handleMoveUp(scope.$index, scope.row)" ></el-button>
				<el-button icon="el-icon-bottom" type="warning" size="small" v-if="scope.$index!=levelsTable.length-1" @click="handleMoveDown(scope.$index, scope.row)" ></el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import xaxios from '../../../components/xaxios.js'
	export default{
		data() {
			return {
				levelsTable: []
			}
		},
		methods:{
			handleEdit(scope){
				scope.row.isEdit = !scope.row.isEdit
			},
			handleDelete(scope){
				console.log(scope)
			},
			// 上移表格条目
			handleMoveUp(index, row){
				let rowData = row
				this.levelsTable.splice(index, 1)
				this.levelsTable.splice(index-1, 0, rowData)
			},
			// 下移表格条目
			handleMoveDown(index, row){
				let rowData = row
				console.log('step1:', index, row)
				this.levelsTable.splice(index , 1)
				this.levelsTable.splice(index + 1 , 0, rowData)
			}
		},
		beforeMount() {
			xaxios('get','levels')
			.then(response => {
				this.levelsTable = response.data
			}).catch(error => {console.log(error)})
		}
	}
</script>

<style>
	.el-icon{
		margin-right: 10px;
	}
</style>
