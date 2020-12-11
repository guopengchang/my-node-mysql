/**
 * 配置环境变量
 */
const config = {
	port: process.env.PORT || 3000,
	    //数据库配置
    db: {
        database: "gpc",
        username: "root",
        password: "root",
        host: "localhost",
        port: 3306,
        timezone: "+08:00", //时区
        dialect: "mysql",  //方言
        define: {
            timestamps: false
        }
    }
}

module.exports = config
