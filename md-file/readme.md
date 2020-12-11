### 开启mysql
cmd管理员身份
net start mysql80
net stop mysql80
### 配置环境变量
系统环境变量 path新建 mysql/bin目录添加进入
### 配置环境变量后
mysql -uroot -p确定
输入密码
### mysql链接报错解决方案
https://blog.csdn.net/qq_44096670/article/details/106780599
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';
SELECT plugin FROM mysql.user WHERE User = 'root';

### navicat使用
1、新建链接
2、右键导入sql文件
3、 右键刷新


# 第一章节

## cookie
- 浏览器访问网页时 自动 带上， 存储5k
- 浏览器访问网页时，会自动带上cookieid,便于服务端识别
- 当用户登录完成后会把返回的sessionid覆盖于cookieid

## session
- 服务端内存中记录的会话状态
- 当用户登录成功后，会在服务端内存中生成session对象并返回sessionid
- 目的： cookieid--sessionid  一一对应

## chrome
- >=80版本时，不再自动带cookie(http), https会带cookie
- 解决： 可以手动在header加上token(jwt)

## jwt(比火车票)
- json web token
- 当登录成功后，生成jwt并返回，保存sessionstorage/localstorage
- 服务端生成jwt会指定一个有效期限，1天，2h
- 发起新请求时，取出jwt放到header中, 服务端验证jwt, 有效则可继续访问
- 服务端不再需要session

## cookie&jwt
- 使用cookie简单，浏览器自带;  jwt需要手动放header
- 需要占用服务端内存空间;  不会占用服务端空间
- 当session失效会话就完了；jwt有效期不受控制

## node
- 为什么后端要用node, 因为它是js
- js运行时环境
- 主要使用express框架， 能够快速搭建后端服务接口

## 启动node服务
- 注意切换目录
- 创建package.json， npm init -y
- 安装依赖包 cnpm i -S express body-parser
- 启动node express-run.js
- 可以把上面的命令写入package.json，然后npm run start
- 停止ctrl+C

## 重构express-run
- 模块化import/export
- es6、babel
- 现在只有一个文件，包装多层套路
- 功能：访问db，记录日志，方便配置, 方便维护
- 支持es6语法需要添加.babelrc, 配置babel及模块化支持
- 添加babel-node,它会在运行时使用.babelrc把代码进行编译
- cnpm i -S babel-cli babel-preset-env babel-plugin-add-module-exports
- 根目录添加入口main.js, 从入口运行
- 需要导出myexpress模块并且把listen方法也要导出到外边去，需要用到promise，与vue相同
- 若不把listen放到main.js，可能main.js没有执行完就开始监听了。
- node-promise: bluebird,node8.util.promisify



# 第二章节
vue---axios--->permission--->后端--->return promise--->res.then

## 控制层
- 作用：参数验证，控制接口的调用逻辑
- 流程逻辑比喻：(验证参数--查询数据库--写入redis--生成jwt--返回json)
- 若把上面每一步代码代码都写在控制器，代码冗余

## 服务层
- 数据库的操作抽到服务层
- 生成jwt抽到一个工具箱，其它模块需要直接导入
- 需要导入数据模型，用于操作数据库

## MYSQL
- 版本5.7.xx， 安装mysql数据库
- 导入sql脚本 表名 列名(字段名) 字段类型 数据长度 主键(唯一)
- Navicat Premium 使用工具导入sql，先连接到mysql，创建表初始化数据库

## SQL
- 只需了解简单增删改查
- 麻烦：需要写sql并把返回数据手动封装成json对象

## ORM--sequelize
- object relational mapping 对象---数据库表---映射关系
- 可以通过对象操作数据库，返回的数据也自动封装成对象
- 生成数据模型----与表字段对应的一个sequelize-json对象
- 使用shell脚本生成数据模型---先连接到数据库---生成
- sequelize-auto：自动生成数据模型对象
- 执行脚本：sh sequelize-modal.sh 不能在win的命令行中运行
- 安装：cnpm i -S sequelize@5 mysql2

## 脚本
- 工程自动化中使用的非常多, 作用：一键完成所有工作
- linux---*.sh  win---*.bat java---groovy test---py java---maven/gradle

## 
数据库----excel表格
用工具把sql脚本导入excel中  让excel有表头及初始数据
数据模型----数据表  与excel一一对应的数据表格
服务层需要调用数据模型操作数据(增删改查)
生成模型的文件哪里来的，手写的还是安装的？---在sql定义的



# 第四章节

## http状态
200 成功
400 错误的请求
500 服务器错误

## sql
查询
select * from jd_user  查询jd_user表的数据
select * from jd_user where account="admin" and `password`="admin@123"  有条件查询
添加
insert into jd_user(account, password, real_name, reg_time) VALUES ("xxxxx", "11111", "yyyyy", now())
更新(一定要加上约束条件)
update jd_user set account='aaaaaa' where id=5
删除(一定要加上约束条件)
delete from jd_user where id=5

## 用户接口
添加
router.route('/user/create').post(userCtrl.createUser);
修改
router.route('/user/update').post(userCtrl.updateUser);
删除
router.route('/user/delete/:id').post(userCtrl.deleteUser);
查询
router.route('/user/query').get(userCtrl.query);

## 分页接口(模糊)
- 输入参数：pageNo页码(从第1页开始)，pageSize当前页条数(一页显示20条)
- 输出参数：list(20条) rows总条数 分页页码=math.ceil(rows/pageSize)
- 模糊查询  模糊匹配
- select * from jd_user where account like '%test%'
- 查找account字段中包括test字符串的所有数据
-

## 表关联
- 用户表 角色表 用户--角色表
- 若需要查询某个用户有什么角色？
- 一个用户可能有多个角色  一个角色可能被多个用户使用
select u.account,u.`password`, r.role_name
from jd_user u 
left join jd_user_role ur on u.id=ur.user_id
left join jd_role r on r.id = ur.role_id
表关联关系 left join xxx on xxx=xxxx


# 第五章节
- nodemon main.js --exec babel-node 使用babel-node执行

## 拦截器
- 作用：过滤过无效请求，包括没有jwt，无效的jwt等

## jwt
- 比如钥匙
- 其中第一段为 header(头)，第二段为 payload (负载)，第三段为signature(签名)
- header: 定义token类型和签名算法，只做base64
- payload: 保存一些不敏感用户信息，如用户名， 只做base64
- sign: 签名，header+payload+secret(加盐) 一起签名算法加密 生成加密字符串
- secret：相当于自己私有的钥匙(很长的字符串64) secret在服务端(私有)
- 以上知道jwt如何生成， 验证jwt是不是有效(通过secret解密)
- cnpm i -S jsonwebtoken
- 服务端一旦生成jwt token，只能等待它过期

## 项目部署-hash
- windows服务器上部署：
- 前端打包npm run build生成打包目录dist, 把dist目录放入http服务器访问
- npm i -g serve  http服务
- serve dist
- 后端启动 先安装依赖cnpm i 启动npm run start
- 代码上传ftp

- linux服务器：
- 代码上传ftp+xshell  xshell可以在终端上上传文件 yum install 
- 用xhell连接服务器 
- 启动后端 先安装依赖 要创建一个sh文件 添加命令：nohup npm run start &  在后端永久运行
- 添加执行权限 sudo chmod +x start.sh
- 前端部署 解压dist目录，创建一个sh文件 文件内容： nohup serve dist &
- 服务器还需要开放端口


- 常用命令
ls 显示当前目录内容
cd 切换目录 
ps 查看进程
vim 编辑文本


## 项目部署-history
- 打包npm run build
- 安装插件connect-history-api-fallback
- 在myexpress.js中配置插件
  app.use(history());
  app.use(express.static(path.join(__dirname, '../dist'))); //指定页面位置
- 只需要启动一个服务即可 npm run start
- 原理： http://localhost:5003/loan-input/index---重定向http://localhost:5003/---
  系统检查到loan-input/index就跳转到对应的模块了

# 第五章
## jwt原理
JWT 的数据结构
它是一个很长的字符串，中间用点（.）分隔成三个部分。注意，JWT 内部是没有换行的，这里只是为了便于展示，将它写成了几行。

JWT 的三个部分依次如下。
Header（头部）
Payload（负载）
Signature（签名）
Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。
{
  "alg": "HS256",
  "typ": "JWT"
}
Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据
注意，JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。
Signature 部分是对前两部分的签名，防止数据篡改。

特点：
JWT 默认是不加密，但也是可以加密的
JWT 不加密的情况下，不能将秘密数据写入 JWT。
JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。
为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

## jwt开发
1.安装依赖
npm install jsonwebtoken express-jwt -S
jsonwebtoken --- 用户签名和验证
express-jwt --- 对jsonwebtoken的封装，能够更好的搭配express

2.生成token
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
var jwt = require('jsonwebtoken');

// 生成token
function generateToken() {
  return jwt.sign({
            foo: 'bar',
          }, 'secretOrPrivateKey', {
            expiresIn: '1d' // 1天 https://github.com/zeit/ms
          });
}

3.返回前端
res.json({
    status: true,
    data: {
      token: generateToken()
    },
    message: '登录成功！'
  });

3.登录验证
var jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
  if(req.headers.hasOwnProperty('token')) {
    jwt.verify(req.headers.token, 'hahaha', function(err, decoded) {
      if(err) {
        res.json({
          status: false,
          message: 'token不存在或已过期'
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

4.$.ajax({
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('token') // "Bearer "这个也是约定的，必须是这样的格式
  },
  // ...
});

## express-jwt
1.router.post('/xxx', expressJWT({secret: 'secretOrPrivateKey'}), function (req, res, next) {
  // ...
});
