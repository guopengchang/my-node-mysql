

const express = require('express');
const router = express.Router();

//引入控制层的user模块
const userCtrl = require('./controllers/user.js')
const serialCtrl = require('./controllers/serial.js')

//控制器接口--需要路由  接口请求方式(get post)
//接口定义请求方式： get post delete put
//用户        路由地址     请求方式   控制器接口
router.route('/user/list-page').post(userCtrl.listPage);
router.route('/user/create').post(userCtrl.createUser);
router.route('/user/update').post(userCtrl.updateUser);
router.route('/user/delete/:id').post(userCtrl.deleteUser);


//用户路由
router.route('/user/login').post(userCtrl.login);
router.route('/user/logout').get(userCtrl.logout);
router.route('/user/query').get(userCtrl.query);
// 概览总数和总金额：http://api.jxsjs.com/equipment/overview
// 设备状态汇总：http://api.jxsjs.com/equipment/status-overview
// 设备分类汇总：http://api.jxsjs.com/equipment/category-overview
router.route('/user/overview').get(userCtrl.overview);
router.route('/user/status-overview').get(userCtrl.statusoverview);
router.route('/user/category-overview').get(userCtrl.categoryoverview);

//设备路由
// serialService.createUser is not a function
router.route('/serial/create').post(serialCtrl.createserial);
 // serialService.findUserByPage is not a function?
router.route('/serial/pre-list').post(serialCtrl.prelist);
module.exports = router;


// //1:加载http express框架
// //2:创建服务器
// const http = require("http");
// const express = require("express");
// var app = express();
// var server = http.createServer(app);
// server.listen(8080);
// //方式一:参数 /user?uid=10&loc=bj
// app.get("/user", (req, res) => {
// 	//express为每req对象添加属性query属性
// 	console.log(req.query.uid);
// 	console.log(req.query.loc);
// });
// //方式二:参数/book/jsj/10
// app.get("/book/:btype/:bid", (req, res) => {
// 	//接收请求地址中参数 params
// 	console.log(req.params.btype);
// 	console.log(req.params.bid);
// }); //jd/jd_user 15:30---15:40

// 分类: Node