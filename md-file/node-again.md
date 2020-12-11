nodejs 内置变量含义
__dirname 表示当前文件所在的目录的绝对路径
__filename 表示当前文件的绝对路径
module.filename ==== __filename 等价
process.cwd() 返回运行当前脚本的工作目录的路径
process.chdir() 改变工作目录


path.join(__dirname, 'public') 表示工程路径后面追加 public
app.use(express.static(path.join(__dirname, 'public')))


使用require加载模块
使用exports 接口对象用来导出模块中的成员
node是模块作用域，所有成员都只在当前文件模块内有效

导出多个成员
	必须放在对象里面才可以导出多个成员
导出单个成员
	拿到的就是函数与字符串...
