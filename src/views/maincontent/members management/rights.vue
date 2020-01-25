<template>
	<div>
		<el-table :data="rightsTable">
			<el-table-column label="编号" type="index" width="100px" align="center"></el-table-column>
			<el-table-column label="权益名称" prop="name" width="200px" align="center">
				<template slot-scope="scope">
					<span v-if="!scope.row.isEdit">{{scope.row.name}}</span>
					<el-input v-else v-model="scope.row.name"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="详细介绍" prop="remark" align="center" show-overflow-tooltip>
				<template slot-scope="scope">
					<span v-if="!scope.row.isEdit">{{scope.row.remark}}</span>
					<el-input v-else v-model="scope.row.remark"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button icon="el-icon-edit" size="small" @click="handleEdit(scope)"></el-button>
					<el-button icon="el-icon-document" size="small" @click="detailsDialogVisible = true"></el-button>
					<el-dialog :visible.sync="detailsDialogVisible" title="权益详情" width="40%">
						<el-form>
							<el-form-item label="权益名称"><el-input v-model="scope.row.name"></el-input></el-form-item>
							<el-form-item label="备注"><el-input type="textarea" v-model="scope.row.remark" style="width: 202px;"></el-input></el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="detailsDialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="detailsDialogVisible = false">确 定</el-button>
						</span>
					</el-dialog>
					<el-button icon="el-icon-delete" size="small" @click="handleDelete(scope)"></el-button>
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
				rightsTable: [],
				detailsDialogVisible: false,
				detailsForm: {
					name: '',
					mark: ''
				}
			}
		},
		methods:{
			// 点击编辑按钮，在当前行进行编辑
			handleEdit(scope){
				scope.row.isEdit = !scope.row.isEdit
			},
			// 显示详细信息，在列表页显示不全时，可以点击按钮弹出对话框，显示完全信息
			handleDetails(row){
				console.log(row)
			},
			handleDelete(scope){
				console.log(scope)
			}
		},
		beforeMount() {
			xaxios('get','rights')
			.then(response => {
				console.log(response)
				this.rightsTable = response.data
			}).catch(error => console.log(error))
		}
	}
</script>

<style>
	.el-button{
		margin-right: 15px;
		margin-left: 0;
	}
	
	.el-button+{
		margin-left: 0;
	}
</style>
