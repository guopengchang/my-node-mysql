// 用户服务层
//调用MYSQL接口

/**导入日志 */
const logger = require('../utils/logger.js');
//models 就是数据库
const models = require('../models/index.js')  //  ./models等价于./models/index
const User = models.jd_user;

console.log(User+'+++++++++++')
//调用MYSQL接口的二次封装

/*登录查询**/
function findUser(account, pwd) {
    return User.findOne({//User模型自带findOne
        where: { //where查询条件
            account: account,   //左边的名字对应user模型名  右边是参数 
            password: pwd
        }
    })  //findOne--User模型自带的
}

/**
 * 用户添加
 * 输入参数：user对象，包括用户的基本信息，不需要id, 会自动增加
 * 输出：无
 */
function createUser(user) {
    return User.create(user);  //创建
}

/**
 * 用户修改
 * 输入参数：user对象，包括用户的基本信息, 需要id
 */
function updateUser(user) {
    if (user && user.id) {
        return User.findByPk(user.id) //根据用户id查找
            .then(u => { //u===查找到的用户
                return u.update(user)  //把传入的user覆盖到数据库的u上面
            })
    } else {
        logger.error("参数错误：" + JSON.stringify(user))
    }
}

/**
 * 用户删除
 * 输入参数：id
 */
function deleteUser(uid) {
    return User.destroy({ //删除  方法在数据模型中定义
        where: {
            id: uid
        }
    })
}

/**
 * 用户分页
 * 输入参数：pageNo页码(从第1页开始)，pageSize当前页条数(一页显示20条)
   输出参数：list(20条) rows总条数 分页页码=math.ceil(rows/pageSize)
   - account  模糊匹配
 */
async function findUserByPage(pageNo, pageSize, account) {
    let limit = pageSize; //读多少条
    let offset = pageNo * pageSize; //从哪一条开始读 数据库里是从0开始
    let result = {};
    if (account) {
        //模糊匹配分页结果
        var d = await models.sequelize
            .query(`select * from jd_user where account like ? limit ${offset},${limit}`,
                { replacements: ['%' + account + '%'], model: User })
        //用account替换?
        // model: User 意思是把查询的结果转换为数据对象

        result.data = d;
        //模糊匹配分页总条数
        var dd = await models.sequelize
            .query("select count(*) num from jd_user where account like ?",
                { replacements: ['%' + account + '%'] })
        if (dd) {
            // if (dd[0] && dd[0].length>0)
            result.rows = dd[0][0].num; //sql结果是一个二维数组
            result.pages = Math.ceil(result.rows / pageSize)
        }
    } else {
        var d = await User.findAll({ //查询所有
            limit: Number(limit),   //数字转换
            offset: Number(offset),
            order: [
                ["id", "desc"]  //数据反过来排列
            ]
        })
        result.data = d;
        var dd = await models.sequelize
            .query("select count(*) num from user")
        if (dd) {
            // if (dd[0] && dd[0].length>0)
            result.rows = dd[0][0].num; //sql结果是一个二维数组
            result.pages = Math.ceil(result.rows / pageSize)
        }
    }
    return result;
}

module.exports = {
    createUser, //增
    deleteUser, //删
    updateUser, //改
    findUser, //查
    findUserByPage //分页查询
}


