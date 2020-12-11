//引入express框架
const express = require('express');
//解析http请求参数
const bodyParser = require('body-parser');

const router = require('./router.js');
const logger = require('./utils/logger.js');

//不同的环境用不同的端口
const config = require('./config/config.js');

//导入jwt 验证
const checkPermission = require('./utils/verifyToken.js');

const app = express();

//跨域处理
//
app.use(bodyParser.json()); //解析前端发送的json数据
app.use(bodyParser.urlencoded({ extended: true })); //解析前端发表单数据

logger.warn('配置路由')
// app.all("*", function (req, res, next) {
//   //   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//   //   //允许的header类型
//   res.header("Access-Control-Allow-Headers", "content-type");
//   //   //跨域允许的请求方式
//   res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
//   next();
// });

//先校验token，再进入路由环节
app.use(checkPermission);

//总路由控制
//当以/api开头的才进入当前路由
//现在apI已经被重写了， 重写为空的了，所以不可以用/api啦
app.use(router);

app.listen(config, function () { logger.warn('3000---') });