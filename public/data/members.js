//引入mockjs文件
let Mock = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
	var data = {
		members: [], //定义接口名称为members
		levels: [{
			"levelLabel": "普通用户",
			"price": "0"
		},{
			"levelLabel": "会员",
			"price": "100.00"
		},{
			"levelLabel": "中级会员",
			"price": "500.00"
		},{
			"levelLabel": "高级会员",
			"price": "1000.00"
		}], //定义会员级别接口名称为levels
		rights: [],
		integral: [{
			"name": "首次注册并登录",
			"integral": 25,
			"limit": null,
			"participants": 0,
			"sum": 1200,
			"updateTime": Random.datetime('yyyy-MM-dd A HH:mm:ss'),
			"isShow": true,
			"isEdit": false
		},{
			"name": "签到",
			"integral": 10,
			"limit": 1,
			"participants": 0,
			"sum": 110,
			"updateTime": Random.datetime('yyyy-MM-dd A HH:mm:ss'),
			"isShow": true,
			"isEdit": false
		},{
			"name": "开通会员",
			"integral": 0,
			"limit": null,
			"participants": 0,
			"sum": 10,
			"updateTime": Random.datetime('yyyy-MM-dd A HH:mm:ss'),
			"isShow": true,
			"isEdit": false
		},{
			"name": "报名社区活动",
			"integral": 10,
			"limit": 5,
			"participants": 0,
			"sum": 350,
			"updateTime": Random.datetime('yyyy-MM-dd A HH:mm:ss'),
			"isShow": true,
			"isEdit": false
		},{
			"name": "发布生活圈",
			"integral": 1,
			"limit": 2,
			"participants": 0,
			"sum": 0,
			"updateTime": Random.datetime('yyyy-MM-dd A HH:mm:ss'),
			"isShow": false,
			"isEdit": false
		},{
			"name": "分享养老咨询",
			"integral": 5,
			"limit": 6,
			"participants": 0,
			"sum": 200,
			"updateTime": Random.datetime('yyyy-MM-dd A HH:mm:ss'),
			"isShow": true,
			"isEdit": false
		}]
	};
	
	Random.extend({
		level: function() {
			var level = ['普通用户','会员', '中级会员', '高级会员']
			return this.pick(level)
		},
		feature: function(){
			var feature = ['喜静', '活跃分子', '话少', '易怒', '群众领袖', '旅居达人', '爱养生', '忧郁', '难沟通']
			return this.pick(feature)
		}
	})
	//动态生成200条会员数据
	for (let i = 0; i < 200; i++) {
		data.members.push({
			"id": Random.increment(),
			"cname": Random.cname(),
			"age": Random.integer(20,120),
			"cellphone": Mock.mock(/^(13[0-9]|14[57]|15[0123456789]|18[012356789])\d{8}$/),
			"cardNo": Random.string('number', 6),
			"level": Random.level(),
			"accountBalances": Random.float(100, 5000, 2, 2),
			"avatar": Random.image('50x50', Random.hex()),
			"points": Random.integer(0, 1000),
			"joinDate": Random.datetime(),
			"region": Random.county(true),
			"feature": Random.feature()
		})
	}
	//动态生成权益列表
	for (let i = 0; i < 10; i++){
		data.rights.push({
			"name": Random.ctitle(),
			"remark": Random.csentence(10,20),
			"isEdit": false
		})
	}

	return data
}
