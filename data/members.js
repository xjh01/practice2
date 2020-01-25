//引入mockjs文件
let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
  var data = { 
      members: [],//定义接口名称为members
  };
  /* var images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6))); */
  
  Random.extend({
	  level:function(){
		  var level = ['小会员','普通会员','高级会员']
		  return this.pick(level)
	  }
  })
//动态生成50条会员数据
  for (var i = 0; i < 50; i++) {
    data.members.push({
         "id": i,
        "cname": Random.cname(),
        "cellphone": Random.string('number',11),
        "cardNo": Random.string('number',6),
        "level": Random.level(),
        "accountBalances": Random.integer(100,5000),
		"avatar": Random.image('50x50', '#FF6600'),
		"points": Random.integer(0,1000),
		"joinDate": Random.datetime()
    })
  }

  return data
}