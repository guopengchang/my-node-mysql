// import * as userService from '../service/user.service'
//服务器里面的方法封装了mysql的方法啦，所以直接用就好了
const userService = require('../service/user.service');
const logger = require('../utils/logger.js');

//处理接口执行的函数
//处理接口的业务逻辑

//导入生成token的函数
const createToken = require('../utils/createToken.js');

const operations = {
	//退出登录
	logout(req,res){
		res.status(200).json({"message":"成功"})
	},
	//用户查询
	query: function (req, res) {
		logger.info("用户查询开始")
		userService.findUser("admin", "admin@123")
			.then(data => {
				data.code=0;
				res.status(200).json(data)
				logger.info("用户查询结束")
			})
	},

	// 用户登录接口
	login: function (req, res) {
		let { account, password } = req.body;
		console.log(account,password)
		logger.info("调用用户登录接口开始" + account + " " + password)
		userService.findUser(account, password)
			.then(data => {
				if (data) {
					//data中不能有密码
					let result = {
						data: data,
						msg: "用户登录成功"
					}
					//生成token,并且方会给前端
					let jwt = createToken(result);
					result.token = jwt;
					result.code = 0;
					res.status(200).json(result)
					logger.info("用户登录成功")
				} else {
					res.status(400).json({ "msg": "用户登录失败" })
					logger.info("用户登录失败")
				}
			})
	},

	listPage: function (req, res) {
		let { pageNo, pageSize, account } = req.body;
		if (pageNo && pageSize) {
			pageNo = pageNo - 1; //页数是从1开始 数据库是从0开始
			userService.findUserByPage(pageNo, pageSize, account)
				.then(data => {
					res.status(200).json(data)
				})
		}
	},
	// 添加用户
	createUser: function (req, res) {
		const user = req.body;
		logger.info("添加用户" + JSON.stringify(user))
		userService.createUser(user)
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
	updateUser: function (req, res) {
		const user = req.body;
		logger.info("修改用户" + JSON.stringify(user))
		userService.updateUser(user)
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
	deleteUser: function (req, res) {
		const userId = req.params.id;
		logger.info("删除用户" + userId)
		userService.deleteUser(userId)
			.then(data => {
				res.status(200).json({ "msg": "删除用户成功" })
				logger.info("删除用户结束")
			})
			.catch(err => {
				res.status(400).json({ "msg": err })
				logger.info("删除用户异常")
			})
	},
	//获取数据
	overview:function(req,res){
		console.log('来了么')
		res.status(200).json({number: 28, amount: 12544000});
	},
	statusoverview:function(req,res){
		res.status(200).json( {label: ["闲置", "使用", "保修", "处置"], value: [80, 300, 20, 40]});
	},
	categoryoverview:function(req,res){
		res.status(200).json(
			{label: ["房屋及构筑物", "仪器仪表", "机电设备", "卫生医疗器械",
			 "文体设备", "文物及陈列品", "图书", "工具、量具和器皿", "行政办公设备"],
			value: [20, 84, 37, 30, 326, 64, 541, 320, 54]}
		);
	}
}


module.exports = operations;

// 概览总数和总金额：http://api.jxsjs.com/equipment/overview
// 设备状态汇总：http://api.jxsjs.com/equipment/status-overview
// 设备分类汇总：http://api.jxsjs.com/equipment/category-overview
// 
// {label: ["闲置", "使用", "保修", "处置"], value: [80, 300, 20, 40]}
// {label: ["房屋及构筑物", "仪器仪表", "机电设备", "卫生医疗器械", "文体设备",
//  "文物及陈列品", "图书", "工具、量具和器皿", "行政办公设备"],
// value: [20, 84, 37, 30, 326, 64, 541, 320, 54]}


