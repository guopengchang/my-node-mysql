// 用户服务层
//调用MYSQL接口

/**导入日志 */
const logger = require('../utils/logger.js');
//models 就是数据库
const models = require('../models/index.js')  //  ./models等价于./models/index
const Serial = models.serial;

//调用MYSQL接口的二次封装
console.log(Serial+'----------')

/*登录查询**/
function findSerial(account, pwd) {
    return Serial.findOne({//Serial模型自带findOne
        where: { //where查询条件
            account: account,   //左边的名字对应Serial模型名  右边是参数 
            password: pwd
        }
    })  //findOne--Serial模型自带的
}

/**
 * 用户添加
 * 输入参数：Serial对象，包括用户的基本信息，不需要id, 会自动增加
 * 输出：无
 */

function createSerial(Ser) {
    return Serial.create(Ser);  //创建
}



/**
 * 用户修改
 * 输入参数：Serial对象，包括用户的基本信息, 需要id
 */
function updateSerial(Serial) {
    if (Serial && Serial.id) {
        return Serial.findByPk(Serial.id) //根据用户id查找
            .then(u => { //u===查找到的用户
                return u.update(Serial)  //把传入的Serial覆盖到数据库的u上面
            })
    } else {
        logger.error("参数错误：" + JSON.stringify(Serial))
    }
}

/**
 * 用户删除
 * 输入参数：id
 */
function deleteSerial(uid) {
    return Serial.destroy({ //删除  方法在数据模型中定义
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

async function findSerialByPage(pageNo, pageSize, account) {
    let limit = pageSize; //读多少条
    let offset = pageNo * pageSize; //从哪一条开始读 数据库里是从0开始
    let result = {};
    if (account) {
        //模糊匹配分页结果
        var d = await models.sequelize
            .query(`select * from serial where account like ? limit ${offset},${limit}`,
                { replacements: ['%' + account + '%'], model: Serial })
        //用account替换?
        // model: Serial 意思是把查询的结果转换为数据对象

        result.data = d;
        //模糊匹配分页总条数
        var dd = await models.sequelize
            .query("select count(*) num from serial where account like ?",
                { replacements: ['%' + account + '%'] })
        if (dd) {
            // if (dd[0] && dd[0].length>0)
            result.rows = dd[0][0].num; //sql结果是一个二维数组
            result.pages = Math.ceil(result.rows / pageSize)
        }
    } else {
        var d = await Serial.findAll({ //查询所有
            limit: Number(limit),   //数字转换
            offset: Number(offset),
        })
        result.data = d;
        var dd = await models.sequelize
            .query("select count(*) num from serial")
        if (dd) {
            // if (dd[0] && dd[0].length>0)
            result.rows = dd[0][0].num; //sql结果是一个二维数组
            result.pages = Math.ceil(result.rows / pageSize)
        }
    }
    return result;
}

module.exports = {
    createSerial, //增
    deleteSerial, //删
    updateSerial, //改
    findSerialByPage //分页查询
}


// serialService.createUser is not a function  at createserial
// 
// 
// 1. name以"李"开头

// where name like '李%'

 

// 2. name中包含"云"，“云”可以在任何位置

// where name like '%云%'

 

// 3. 第二个和第三个字符是0的值

// where salary like '_00%'

 

// 4. 条件匹配以2开头，而且长度至少为3的值：

// where salary like '2_%_%'

 

// 5. 以2结尾

// where salary like '%2'

 

// 6. 第2个位置是2，以3结尾

// where salary like '_2%3'
// 
