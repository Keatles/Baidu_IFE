## Data analysis

根据传入的参数，抓取百度第一页对应的搜索结果。输出格式为

	{
   		code: 1, //返回状态码，1为成功，0为失败
   		msg: '抓取成功', //返回的信息
   		word: '示例关键字', //抓取的关键字
   		time: 2000, //任务的时间
   		dataList:[   //抓取结果列表
       	{
           title: 'xx',  //结果条目的标题
           info: ‘’, //摘要
           link: ‘’, //链接            
           pic: '' //缩略图地址
           }
   		]
	}

## bash

	phantomjs getDoc.js keyword
	phantomjs getJSON.js keyword

抓取json响应时间要比抓取document网页内容要快很多