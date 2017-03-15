var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var resultSchema = mongoose.Schema({
    code:Number,
    msg:String,
    word:String,
    device:String,
    time:Number,
    dataList:[{
        info:String,
        link:String,
        pic:String,
        title:String
    }]
});

http.createServer(function(request,response) {
    var cmdStr = 'phantomjs task.js'
	console.log('request received');
	response.writeHead(200,{'Content-Type':'text/plain'});
	if(url.parse(request.url).query){
        var queryObj = url.parse(request.url,true).query;
        exec(cmdStr + ' ' + queryObj.device + ' ' + queryObj.word,(err,stdout,stderr) => {
            if(err) {
                console.log(`exec error:${err}`);
            } else {
                mongoose.connect('mongodb://localhost/baidu');
                var db = mongoose.connection;
                db.on('error',console.error.bind(console, 'connection error:'))
                db.once('open', function (callback) {
                    var Result = mongoose.model('Result',resultSchema);
                    var result = new Result(JSON.parse(stdout));
                    result.save(function (err){
                        if(err) {
                            console.log(err);
                        }else{
                            console.log('data saved')
                        }
                    })
                });

            }
        })
    }
	response.write('在地址栏输入localhost:9090/?word={keyword}&&device={ipad||iphone5||iphone6}');
	response.end();
}).listen(9090);
console.log('server started,listen on localhost:9090');

