<template>
	<div>
		<div class="account">
			<el-row>
				<el-col :span="24">
					<p>
						会员总数：
						<span>{{ users.all }}</span>
						人
					</p>
					<p>
						普通用户：
						<span>{{ users.normalUsers }}</span>
						人，会员：
						<span>{{ users.members }}</span>
						人，中级会员：
						<span>{{ users.intermediateMembers }}</span>
						人，高级会员：
						<span>{{ users.seniorMembers }}</span>
						人
					</p>
				</el-col>
			</el-row>
		</div>
		<div class="memberList">
			<!-- 筛选条件 -->
			<el-collapse accordion style="padding-bottom: 0;">
				<el-collapse-item>
					<!-- 筛选条件按钮及已经选择了的条件 -->
					<template slot="title">
						<el-button type="warning" size="mini">筛选条件</el-button>
						<el-tag class="filterTagShow" size="mini" v-for="(tag, index) in tagsList" :key="index" closable @close="handleClose(index)" v-show="tag.label">{{ tag.label }}</el-tag>
						<el-button class="restFilterButton" @click="restFilterCondtions" size="mini" type="infor">重置</el-button>
					</template>
					<div class="filterCondition">
						<el-row :gutter="1">
							<el-col :span="2" class="filterSpan"><span>年龄</span></el-col>
							<el-col :span="20">
								<el-form :inline="true">
									<el-form-item v-for="item in ageOption" :key="item.value">
										<el-button type="text" @click="handleSelect(item, 0)">{{ item.label }}</el-button>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</div>
					<div class="filterCondition">
						<el-row :gutter="1">
							<el-col :span="2" class="filterSpan"><span>会员级别</span></el-col>
							<el-col :span="20">
								<el-form :inline="true">
									<el-form-item v-for="item in levelOption" :key="item.value">
										<el-button type="text" @click="handleSelect(item, 1)">{{ item.label }}</el-button>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</div>
					<div class="filterCondition">
						<el-row :gutter="1">
							<el-col :span="2" class="filterSpan"><span>入会时间</span></el-col>
							<el-col :span="20">
								<el-date-picker
									v-model="joinDate"
									type="daterange"
									range-separator="-"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									:picker-options="pickerOptions"
									size="mini"
									format="yyyy 年 MM 月 dd 日"
									value-format="yyyy-MM-dd"
									unlink-panels
									@change="handleDateSelect"
								></el-date-picker>
							</el-col>
						</el-row>
					</div>
					<!-- 行政区域级联选择 -->
					<div class="filterCondition">
						<el-row :gutter="1">
							<el-col :span="2" class="filterSpan"><span>所属区域</span></el-col>
							<el-col :span="20">
								<el-cascader size="mini" :options="provinceOption" :props="cascaderProps" v-model="regionCascader" collapse-tags @change="handleRegionChange"></el-cascader>
							</el-col>
						</el-row>
					</div>
					
					<!-- 特征选项框 -->
					<div class="filterConditionFeatures">
						<el-row :gutter="1">
							<el-col :span="2" class="filterSpan"><span>特征</span></el-col>
							<el-col :span="20">
								<el-checkbox size="mini" :indeterminate="featureIsIndeterminate" v-model="featureCheckAll" @change="handleFeatureCheckAllChange">全选</el-checkbox>
								<el-checkbox-group v-model="featuresList" class="features" @change="handleCheckedFeatureChange">
									<el-checkbox size="mini" v-for="(feature, index) in featuresOption" :key="index" :label="feature"></el-checkbox>
								</el-checkbox-group>
							</el-col>
						</el-row>
					</div>
					
				</el-collapse-item>
			</el-collapse>
			<!-- 按钮组 -->
			<el-row :gutter="1" class="operationButtons">
				<el-col :span="2"><el-button type="primary" size="small">批量导入</el-button></el-col>
				<el-col :span="2"><el-button type="primary" size="small" @click="exportExcel">下载模板</el-button></el-col>
				<el-col :span="2"><el-button type="success" size="small">导出会员</el-button></el-col>
				<el-col :span="2"><el-button type="danger" size="small">读卡</el-button></el-col>
				<el-col :span="2" style="display: inline-flex;align-items: center;">
					<el-input size="small"></el-input>
					<el-button class="el-icon-search" size="small" type="primary"></el-button>
				</el-col>
				<el-col :span="2"><el-button type="primary" size="small">新建</el-button></el-col>
			</el-row>
			<!-- 数据列表 -->
			<el-row>
				<el-col>
					<el-table id="membersTable" :data="tableData" >
						<el-table-column prop="cname" label="姓名"></el-table-column>
						<el-table-column prop="age" label="年龄"></el-table-column>
						<el-table-column prop="cellphone" label="手机号"></el-table-column>
						<el-table-column prop="level" label="会员级别"></el-table-column>
						<el-table-column prop="cardNo" label="会员卡号"></el-table-column>
						<el-table-column prop="accountBalances" label="余额"></el-table-column>
						<el-table-column prop="points" label="积分"></el-table-column>
						<el-table-column prop="joinDate" label="入会时间" sortable></el-table-column>
						<el-table-column prop="region" label="所属地区"></el-table-column>
						<el-table-column prop="feature" label="特征"></el-table-column>
						<el-table-column label="操作" type="expand">
							<template slot-scope="props">
								<el-form inline>
									<el-form-item v-for="(detail ,index) in detailsHandle" :key="index">
										<el-button type="info" size="small" plain round @click="detail.dialogVisible = true">{{detail.title}}</el-button>
									</el-form-item>
									<el-button @click="showProps(props)">显示props内容</el-button>
								</el-form>
								<!-- 更换会员头像窗口 -->
								<el-dialog title="会员头像" :visible.sync="detailsHandle[0].dialogVisible" width="50%">
									<el-row>
										<el-col :span="10" :offset="7">
											<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/">
												<i class="el-icon-upload"></i>
												<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
												<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
											</el-upload>
										</el-col>
									</el-row>
									<span slot="footer" class="dialog-footer">
										<el-button @click="detailsHandle[0].dialogVisible = false">取 消</el-button>
										<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
									</span>
								</el-dialog>
								<!-- 修改余额操作（充值/扣费） -->
								<el-dialog title="余额操作" :visible.sync="detailsHandle[1].dialogVisible" width="50%">
									<el-form class="balanceForm" ref="balanceForm" label-width="100px" label-position="center" :rules="balanceFormRules" :model="balanceForm">
										<el-form-item label="姓名">
											<span>{{props.row.cname}}</span>
										</el-form-item>
										<el-form-item label="支付类型" >
											<el-radio-group v-model="balanceForm.payType">
												<el-radio label="充值"></el-radio>
												<el-radio label="扣减"></el-radio>
											</el-radio-group>
										</el-form-item>
										<el-form-item label="支付方式" prop="payPattern">
											<el-select v-model="balanceForm.payPattern" placeholder="请选择支付方式" size="small">
												<el-option v-for="(pay, index) in payPatternOption" :key="index" :label="pay.label" :value="pay.value"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="支付金额" prop="payAmount">
											<el-input v-model.number="balanceForm.payAmount" size="small" maxlength="10">
												<template slot="append">元</template>
											</el-input>
										</el-form-item>
									</el-form>
									<span slot="footer" class="dialog-footer">
										<el-button @click="detailsHandle[1].dialogVisible = false">取 消</el-button>
										<el-button type="primary" @click="submitBalanceForm">确 定</el-button>
									</span>
								</el-dialog>
								<el-dialog title="权益登记" :visible.sync="detailsHandle[2].dialogVisible" width="50%">
									<el-form class="rightsForm">
										<el-form-item label="选择权益">
											<el-select v-model="rightsIndex" @focus="getRightsTable" @change="handleRightsChange">
												<el-option v-for="(right, index) in rightsTable" :key="index" :label="right.name" :value="index"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="备注">
											<el-input type="textarea" style="width: 217px;" v-model="rightsForm.remark" resize="none" readonly></el-input>
										</el-form-item>
									</el-form>
									<span slot="footer" class="dialog-footer">
										<el-button @click="detailsHandle[2].dialogVisible = false">取 消</el-button>
										<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
									</span>
								</el-dialog>
							</template>
						</el-table-column>
					</el-table>
					
				</el-col>
			</el-row>
			<!-- 分页 -->
			<div class="pagination">
				<el-pagination layout="total, prev, pager, next" :page-size="10" :total="total" :current-page.sync="currentPage" background @current-change="handleCurrentChange" ></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import xaxios from '../../../components/xaxios.js';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
	data() {
		return {
			rightsIndex: null,
			rightsTable: [],
			rightsForm: {
				name: '',
				remark: ''
			},
			balanceForm: {
				payType: '充值',
				payPattern: '',
				payAmount: null,
			},
			balanceFormRules: {
				payPattern: [
					{required: true, message: '请选择一种支付方式', trigger: 'change'}
				],
				payAmount: [
					{required: true , message: '金额不能为空', trigger: 'blur'},
					{type: 'number' , message: '金额必须为数字', trigger: 'change'}
				]
			},
			payPatternOption: [{
				label: '微信',
				value: 'wx'
			},{
				label: '支付宝',
				value: 'zfb'
			},{
				label: '银行卡',
				value: 'yhk'
			},{
				label: '现金',
				value: 'xj'
			}],
			detailsHandle: [{
				title: '会员头像',
				dialogVisible: false
			},{
				title: '余额操作',
				dialogVisible: false
			},{
				title: '权益登记',
				dialogVisible: false
			},{
				title: '积分变更',
				dialogVisible: false
			},{
				title: '账户流水',
				dialogVisible: false
			},{
				title: '删除会员',
				dialogVisible: false
			},{
				title: '积分记录',
				dialogVisible: false
			},{
				title: '消费记录',
				dialogVisible: false
			},{
				title: '绑卡',
				dialogVisible: false
			}],
			featuresList: [],
			featuresOption: ['喜静', '活跃分子', '话少', '易怒', '群众领袖', '旅居达人', '爱养生', '忧郁', '难沟通'],
			featureIsIndeterminate: false,
			featureCheckAll: false,
			cascaderProps: {
				value: 'area_name',
				label: 'area_name',
				children: 'children',
				multiple: true,
				expandTrigger: 'hover',
				
			},
			regionCascader: '',
			area: [],
			provinceOption: [],
			ageOption: [
				{
					label: '40岁以下',
					value: 'age_lte=40'
				},
				{
					label: '41~50岁',
					value: 'age_gte=41&age_lte=50'
				},
				{
					label: '51~60岁',
					value: 'age_gte=51&age_lte=60'
				},
				{
					label: '61~70岁',
					value: 'age_gte=61&age_lte=70'
				},
				{
					label: '71~80岁',
					value: 'age_gte=71&age_lte=80'
				},
				{
					label: '81~90岁',
					value: 'age_gte=81&age_lte=90'
				},
				{
					label: '90岁以上',
					value: 'age_gte=91'
				}
			],
			levelOption: [
				{
					label: '普通用户',
					value: 'level=普通用户'
				},
				{
					label: '会员',
					value: 'level=会员'
				},
				{
					label: '中级会员',
					value: 'level=中级会员'
				},
				{
					label: '高级会员',
					value: 'level=高级会员'
				}
			],
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}
				]
			},
			joinDate: '',
			tagsList: [
				{
					title: 'age',
					label: null,
					value: null
				},{
					title: 'level',
					label: null,
					value: null
				},{
					title: 'joinDate',
					label: null,
					value: null
				},{
					title: 'region',
					label: null,
					value: null
				},{
					title: 'feature',
					label: null,
					value: null
				}
				
			],
			
			tableData: [],
			link: 'members?',
			linkDefault: 'members?',
			params: {
				_page: 0,
				_limit: 10
			},
			pageSize: 10,
			total: 0,
			currentPage: 1,
			users: {
				all: 0,
				normalUsers: 0,
				members: 0,
				intermediateMembers: 0,
				seniorMembers: 0
			}
		};
	},
	methods: {
		showProps(props){
			console.log(props)
		},
		
		// 特征选项框选择“全选”
		handleFeatureCheckAllChange(val) {
			this.featuresList = val ? this.featuresOption : [];
			if(val){
				this.tagsList[4].label = this.featuresList
				for (let i = 0; i < this.featuresList.length; i++) {
					if(i===0){
						this.tagsList[4].value = this.tagsList[4].value + 'feature=' + this.featuresList[i]
					}else{
						this.tagsList[4].value = this.tagsList[4].value + '&feature=' + this.featuresList[i]
				}
			}}else{
				this.tagsList[4].label = null
				this.tagsList[4].value = null
			}
			this.featureIsIndeterminate = false;
			this.jointLink()
		},
		// 处理特征选项框选择
		handleCheckedFeatureChange(value) {
			let checkedCount = value.length;
			this.featureCheckAll = checkedCount === this.featuresOption.length;
			this.featureIsIndeterminate = checkedCount > 0 && checkedCount < this.featuresOption.length;
			if(value.length === 0){
				this.tagsList[4].label = null
				this.tagsList[4].value = null
			}else{
				this.tagsList[4].label = this.featuresList
				for (let i = 0; i < value.length; i++) {
					if(i===0){
						this.tagsList[4].value = 'feature=' + value[i]
					}else{
						this.tagsList[4].value = this.tagsList[4].value + '&feature=' + value[i]
					}
					
				}
			}
			this.jointLink()
		},
			
		
		// 通过筛选条件获取相关数据
		// 1.处理年龄和级别的选择
		handleSelect(item, index){
			this.tagsList[index].label = item.label
			this.tagsList[index].value = item.value
			this.jointLink()
		},
		// 2.处理日期选择
		handleDateSelect(item){
			this.tagsList[2].label = item[0] + '至' + item[1]
			this.tagsList[2].value = 'joinDate_gte=' + item[0] + '&joinDate_lte=' + item[1]
			this.jointLink()
		},
		// 处理行政区域级联选择，包含：单选，多选（全选）
		handleRegionChange(){
			
			let regionLabel = ''
			let regionValue = ''
			let flag = 0
			this.regionCascader.forEach(item => {
				let regionLabelTemp = ''
				for (let i = 0; i < item.length; i++) {
					if (regionLabelTemp.length > 0 ){
						regionLabelTemp = regionLabelTemp + ' ' + item[i]
					} else {
						regionLabelTemp = item[i]
					}
					
				}
				regionLabel = regionLabel + regionLabelTemp + '/'
				if(flag === 0){
					regionValue = 'region=' + regionLabelTemp
					flag = 1
				}else{
					regionValue = regionValue + '&region=' + regionLabelTemp 
				}
			})
			this.tagsList[3].label = regionLabel
			this.tagsList[3].value = regionValue
			if(this.tagsList[3].value.length === 0){
				this.tagsList[3].label = null
				this.tagsList[3].value = null
			}
			this.jointLink()
		},
		// 通过拼接筛选条件得到访问筛选的网址，并访问获取数据
		jointLink() {
			this.link = this.linkDefault;
			
			for (let i = 0; i < this.tagsList.length; i++) {
				if(this.tagsList[i].value != null){
					this.link = this.link + '&' + this.tagsList[i].value 
				}
			}
			// console.log(this.link);
			xaxios('get', this.link)
				.then(response => {
					this.total = response.data.length;
				})
				.catch(error => console.log(error));
			this.params._page = 0
			this.currentPage = 1
			xaxios('get', this.link, this.params)
				.then(response => {
					this.tableData = response.data;
				})
				.catch(error => console.log(error));
		},
		// 重置筛选条件
		restFilterCondtions() {
			this.link = this.linkDefault
			this.tagsList.forEach(tag => {
				tag.label = null
				tag.value = null
			})
			this.regionCascader = ''
			this.featuresList = []
			this.featureIsIndeterminate = false;
			this.jointLink()
		},
		// 处理关闭标签事件
		handleClose(index) {
			this.tagsList[index].label = null
			this.tagsList[index].value = null
			if(index === 3){
				this.regionCascader = ''
			}
			this.jointLink()
		},
		
		// 导出表格所用
		exportExcel() {
			// 设置当前日期
			let time = new Date();
			let year = time.getFullYear();
			let month = time.getMonth() + 1;
			let day = time.getDate();
			let name = year + "" + month + "" + day;
			// console.log(name)
			/* generate workbook object from table */
			//  .table要导出的是哪一个表格
			var wb = XLSX.utils.table_to_book(document.querySelector("#membersTable"));
			/* get binary string as output */
			var wbout = XLSX.write(wb, {
				bookType: "xlsx",
				bookSST: true,
				type: "array"
			});
			try {
				//  name+'.xlsx'表示导出的excel表格名字
				FileSaver.saveAs(new Blob([wbout], { type: "application/octet-stream" }),name + ".xlsx");
			} catch (e) {
				if (typeof console !== "undefined") console.log(e, wbout);
			}
			return wbout;
		},
		// 页脚切换
		handleCurrentChange(val) {
			this.params._page = val;
			xaxios('get', this.link, this.params)
				.then(response => {
					// console.log(this.link);
					this.tableData = response.data;
				})
				.catch(error => console.log(error));
		},
		// 余额操作（验证、提交修改的内容）
		submitBalanceForm() {
			this.$refs['balanceForm'].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 激活权益选择框时，远程获取权益列表
		getRightsTable(){
			xaxios('get','rights')
			.then(response => {
				this.rightsTable = response.data
			}).catch(error => console.log(error))
		},
		// 选择权益时，取值赋值给rightsForm
		handleRightsChange(){
			this.rightsForm.name = this.rightsTable[this.rightsIndex].name
			this.rightsForm.remark = this.rightsTable[this.rightsIndex].remark
		}
	},
	computed: {},
	
	//页面加载前
	beforeMount() {
		//获取行政区域划分数据
		axios
			.get('https://comuhome-ty.yunzhuyang.com/service/area/getAllAreaInfoSimple')
			.then(response => {
				// console.log(response)
				this.provinceOption = response.data.data;
			})
			.catch(error => console.log(error));
		//获取默认列表长度，会员种类及数量
		xaxios('get', 'members')
			.then(response => {
				this.total = response.data.length;
				this.users.all = response.data.length;
				response.data.forEach(item => {
					switch (item.level) {
						case '普通用户':
							this.users.normalUsers++;
							break;
						case '会员':
							this.users.members++;
							break;
						case '中级会员':
							this.users.intermediateMembers++;
							break;
						case '高级会员':
							this.users.seniorMembers++;
							break;
					}
				});
			})
			.catch(error => console.log(error));
		//获取列表前10项数据
		xaxios('get', this.link, this.params)
			.then(response => {
				this.tableData = response.data;
			})
			.catch(error => console.log(error));
	}
};
</script>

<style>
.account {
	font-size: 14px;
	font-weight: 600;
}

.account span {
	color: red;
}

.el-collapse {
}

.el-collapse-item__content{
	padding-bottom: 0;
}

.filterCondition {
	align-items: center;
	border-top: #98a0a1 1px dotted;
}

.filterCondition .el-row {
	height: 40px;
}

.filterCondition .el-col-20 {
	height: 40px;
}

.filterSpan {
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.el-range-editor{
	margin-top: 7px
}

.el-cascader{
	width: 220px;
	margin: 7px;
}

.filterTagShow{
	margin-left: 10px;
}

.restFilterButton{
	margin-left: 15px;
}

.filterConditionFeatures{
	border-top: #98a0a1 dotted 1px;
}

.features{
	margin-top: 7px;
}

.operationButtons {
	margin-top: 10px;
}

.pagination {
	margin-top: 10px;
	display: flex;
	justify-content: flex-end;
}

.el-dialog__header{
	font-weight: 600;
	border-bottom: #98A0A1 1px solid;
	margin: 0 10px;
}

.el-dialog__footer{
	border-top: #98A0A1 1px solid;
	margin: 0 10px;
}

.balanceForm .el-form-item{
	justify-content: right;
}

.rightsForm .el-textarea__inner{
	height: 80px;
}
</style>
