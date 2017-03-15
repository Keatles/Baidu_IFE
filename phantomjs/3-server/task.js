var page = require('webpage').create(),
	system = require('system'),
	t = Date.now(),
	url = 'https:www.baidu.com/s?wd=',
	obj = {},result = {},set = {},dataList = {},
	settings =[{
	encoding: "utf8",
	userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
},{
	encoding: "utf8",
	userAgent: "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
}],
	device = {
		iphone5:{
			width:320,
			height:568
		},
		iphont6:{
			width:375,
			height:667
		},
		ipad:{
			width:768,
			height:1024
		}
	};
	

if (system.args.length <= 2) {
	console.log('please enter keyword and device name');
	phantom.exit();
} else {
		var dev = system.args[1];
		//cmd default encode is gbk
		var keyword = encodeURI(system.args[2]);
	if (!device[dev]){
		console.log('please input device name again');
		phantom.exit();
	}
	page.viewportSize = device[dev];
	//利用三元运算符传入相应的settings
	page.open(url + keyword,set = (dev === 'ipad'? settings[1]:settings[0]),function(status){
		if(status !== 'success') {
			obj = {
				code:0,
				msg:'抓取失败',
				word:keyword,
				device:dev,
				time:0
			}
			console.log(JSON.stringify(obj));
			phantom.exit();
		} else {
			page.includeJs('http//cdn.bootcss.com/jquery/3.1.1/jquery.min.js', function() {
				dataList = page.evaluate(function() {
					var data = [];
					var $content = $('.c-container');
					$content.each(function(index) {
						data[index] = {
							title: $(this).find('.t').text() || '',
							info: $(this).find('.c-abstract').text() || '',
							link: $(this).find('.c-showurl').text() || '',
							pic: $(this).find('.general_image_pic img').attr('src') || 'none'
						};
					})
					return data;
				})
				result = {
					code:1,
					msg:'抓取成功',
					word:decodeURI(keyword),
					device:dev
				};
				result.time = Date.now() - t;
				result.dataList = dataList;
				console.log(JSON.stringify(result));
				phantom.exit();
			})
		}	
	})
}