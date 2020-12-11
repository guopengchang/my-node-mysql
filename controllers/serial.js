// import * as serialService from '../service/user.service'
//服务器里面的方法封装了mysql的方法啦，所以直接用就好了
const serialService = require('../service/serial.service');
const logger = require('../utils/logger.js');

//处理接口执行的函数
//处理接口的业务逻辑

//导入生成token的函数

const operations_serial = {
	//用户查询
	query: function (req, res) {
		logger.info("用户查询开始")
		serialService.findSerial("admin", "admin@123")
			.then(data => {
				data.code=0;
				res.status(200).json(data)
				logger.info("用户查询结束")
			})
	},

	//查询所有数据，分类查询
	prelist: function (req, res) {
		let { pageNo, pageSize, account } = req.body;
		if (pageNo && pageSize) {
			pageNo = pageNo - 1; //页数是从1开始 数据库是从0开始
			serialService.findSerialByPage(pageNo, pageSize, account)
				.then(data => {
					console.log('成功了没有')
					res.status(200).json(data)
				})
		}
	},
	
	// 添加用户
	createserial: function (req, res) {
		console.log('--------')
		const user = req.body;
		logger.info("添加用户" + JSON.stringify(user))

		serialService.createSerial(user)
			.then(data => {
				res.status(200).json({ "msg": "添加用户成功", data })
				logger.info("添加用户结束")
			})
			.catch(err => {
				res.status(400).json({ "msg": err })
				logger.info("添加用户异常")
			})
	},

	//修改用户
	updateserial: function (req, res) {
		const user = req.body;
		logger.info("修改用户" + JSON.stringify(user))
		serialService.updateSerial(user)
			.then(data => {
				res.status(200).json({ "msg": "修改用户成功" })
				logger.info("修改用户结束")
			})
			.catch(err => {
				res.status(400).json({ "msg": err })
				logger.info("修改用户异常")
			})
	},
	//删除用户  id参数希望在url最后面 /:id
	deleteserial: function (req, res) {
		const userId = req.params.id;
		logger.info("删除用户" + userId)
		serialService.deleteSerial(userId)
			.then(data => {
				res.status(200).json({ "msg": "删除用户成功" })
				logger.info("删除用户结束")
			})
			.catch(err => {
				res.status(400).json({ "msg": err })
				logger.info("删除用户异常")
			})
	},
}

// serialService.createUser is not a function  at createserial
module.exports = operations_serial;

// 概览总数和总金额：http://api.jxsjs.com/equipment/overview
// 设备状态汇总：http://api.jxsjs.com/equipment/status-overview
// 设备分类汇总：http://api.jxsjs.com/equipment/category-overview
// 
// {label: ["闲置", "使用", "保修", "处置"], value: [80, 300, 20, 40]}
// {label: ["房屋及构筑物", "仪器仪表", "机电设备", "卫生医疗器械", "文体设备",
//  "文物及陈列品", "图书", "工具、量具和器皿", "行政办公设备"],
// value: [20, 84, 37, 30, 326, 64, 541, 320, 54]}


// : Serial.create is not a function