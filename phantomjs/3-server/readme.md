# server

##任务描述

- 安装nodejs和mongodb
- 利用nodejs的HTTP模块封装一个node服务，监听8000端口，接受一个参数（关键字），http模块示例参考如下:

```
	var http = require("http");  
   	http.createServer(function(request, response){  
           console.log('request received');  
           response.writeHead(200, {"Content-Type": "text/plain"});  
           response.write("Hello World");  
           response.end();  
   	}).listen(8000);  
   	console.log('server started');
```
- 收到请求后，启动phantomjs进程执行taskjs，并将接受到的参数传递给phantomjs
- phantomjs执行完后告诉node服务，并传回抓取的json结果
- node服务将结果存到mongodb中（使用mogoose）

## bash
- npm install 
- node server.js

## mongodb操作
- use baidu
- db.results.find({}) //查找所有文档
- db.results.remove({}) //删除所有文档
