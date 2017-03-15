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

## bash

	