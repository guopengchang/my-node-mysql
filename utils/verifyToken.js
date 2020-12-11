// JWT标准的Tokens由三部分组成
// header：包含token的类型和加密算法
// payload：包含token的内容
// signature：通过密钥将前两者加密得到最终的token
const jwt = require('jsonwebtoken');

//导入盐
const salt = require('./salt.js');

let checkPermission = (req, res, next) => {
	console.log(req.method)
	//若是跨域请求， 首先会有一个个试探请求 OPTIONS
	if (req.method == 'OPTIONS') {
		console.log('aaaa')
		res.status(200).send('{"test": "options ok"}');
	} else if (req.originalUrl === '/user/login') { //登录不限制
		//  /api被替换成空字符串了，所以这里不能加/api啦 直接用/api后面的
		console.log(11)
		next();
		// req.url 在内部路由期间可能会被覆盖，而req.originalUrl保持不变。
	} else if (req.headers.hasOwnProperty('token')) { //如果请求头里面带token啦
		// 把要验证的 Token 数据，还有签发这个 Token 的时候用的那个密钥告诉 verify 这个方法，
		// 在一个回调里面有两个参数，error 表示错误，decoded 是解码之后的 Token 数据。
		jwt.verify(req.headers.token, salt, function (err, decoded) {
			if (err) { //如果错误
				if (err.name === 'TokenExpiredError') {//如果token过期 
					// 得到过期时间  若半小时以内 可以刷新token 即不需要重登录
					let time = ((new Date().getTime() - err.expiredAt.getTime() / (1000 * 60)).toFixed(2))
					if (time <= 30) {
						//生成新的token,返回前端
						res.send({ "code": "10001", "token": "cccccccc" });
					}
				} else if (err.name === 'JsonWebTokenError') {//token错误
					console.log('token无效');
				}
			} else {//如果正确
				// logger.info(JSON.stringify(decoded))
				req.user = decoded; //将解密的数据保存在user属性中
				next();
			}

		})

		// Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。
	} else { //否则，请求头没带toeken
		res.send({ "msg": "没有携带token,请求无效" })
	}
}

module.exports = checkPermission;