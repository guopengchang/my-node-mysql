const jwt = require('jsonwebtoken');
//导入盐
const salt = require('./salt.js');
console.log(salt);
const createToken = (data) => {
	//加密的数据， 盐 ， 过期时间，毫秒为单位 1天
	return jwt.sign(data, salt, { expiresIn: 1000 * 60 * 60 * 24 })
}

//导出单个成员 一个函数
module.exports = createToken;



// 安装 jsonwebtoken
// $ npm install jsonwebtoken--save

// 使用

// 引入模块
// let jwt = require(“jsonwebtoken”)
// //let token = jwt.sign({加密数据}，‘加密秘钥’,{expiresIn:token存储的时间 s})
// let token = jwt.sign({ email: email }, ‘email’, { expiresIn: 60 * 30 })
// 3.解密
// jwt.verify(token, ‘email’, function (erro, decode) {
// 	if (!err) {
// 	} else {
// 	}
// }