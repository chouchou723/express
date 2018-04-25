var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const axios = require('axios');
var request = require('superagent');
var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var reactspa = require('./routes/spa');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.use(express.static(path.join(__dirname, 'public'),{
//   maxAge:0
//   }));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/Portfolio-page'),{
  maxAge:864000
}));
app.use('/', index);

// app.use(express.static(path.join(__dirname, 'public/home'),{
//   maxAge:864000
// }));
// app.use('/home', home);
// app.use(express.static(path.join(__dirname, 'public'),{
//   maxAge:864000
// }));
// app.use('/reactspa',reactspa);



// app.get('/drrr',(req,res)=>{
//   res.sendFile(__dirname+'/public/client/index.html')
// })

app.get('/weather/:city', (req,res,next)=>{
  let city = req.params.city;
  let arr
  axios.get('http://api.jisuapi.com/weather/query?appkey=adfb0e1348ec0adf',{params:{city:city}})
  .then(json => {
     arr = json.data
  }).then(()=>{
    res.json(arr)
  })
  .catch(err => console.log(err))
});
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4';
app.get('/bus/:sid/:direction/:stopId', (req,res,next)=>{
  let sid = req.params.sid;
  let direction = req.params.direction;
  let stopId = req.params.stopId;
  let arr;
  let para = {
  stoptype:direction,
  stopid:stopId,
  sid:sid}
  let baseH = {
  Accept:'*/*',
'Accept-Encoding':'gzip, deflate',
'Accept-Language':'zh-CN,zh;q=0.9',
Connection:'keep-alive',
'Content-Length':57,
Host:'shanghaicity.openservice.kankanews.com',
Origin:'http://shanghaicity.openservice.kankanews.com',
Referer:'http://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/eccf0f60e0b483f03cdedaa907e01436',
'User-Agent':'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4',
'X-Requested-With':'XMLHttpRequest'
  }
  let base1 = {
  Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
'Accept-Encoding':'gzip, deflate',
'Accept-Language':'zh-CN,zh;q=0.9',
	  Connection:'keep-alive',
Referer:'http://shanghaicity.openservice.kankanews.com/',

Host:'shanghaicity.openservice.kankanews.com',
'Upgrade-Insecure-Requests':1,
'User-Agent':'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'
  }
  let c1,c2,c3,c4,c5;
	request.get('https://hm.baidu.com/hm.gif?cc=0&ck=1&cl=24-bit&ds=375x667&vl=667&et=0&ja=0&ln=zh-cn&lo=0&lt=1524620683&rnd=719889793&si=6f69830ae7173059e935b61372431b35&v=1.2.30&lv=3&ct=!!&tt=%E4%B8%8A%E6%B5%B7%E5%8F%91%E5%B8%83-%E5%B8%82%E6%94%BF%E5%A4%A7%E5%8E%85&sn=34872')
		.end((err,hr)=>{
		 c1 = hr.headers['set-cookie'].join(',').match(/(HMACCOUNT=.+?);/)[1];
		//console.log(hr);
		console.log(c1);
		request.get('http://shanghaicity.openservice.kankanews.com')
		.end((err,hrr)=>{
			 c2 = hrr.headers['set-cookie'].join(',').match(/(Hm_1vt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
			 c4 = hrr.headers['set-cookie'].join(',').match(/(Hm_lpvt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
			 c5 = hrr.headers['set-cookie'].join(',').match(/(Hm_lvt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
		console.log(c2);
			 c3 = c1+'; '+c2+ '; _gat=1';
			console.log(c3);
					 	request.get('http://shanghaicity.openservice.kankanews.com/public/bus')
	  .set(base1)
	.set('Cookie',c3)
	.end((err,response)=>{
							let cook = response.headers['set-cookie'].join(',');
 	let cookie1 = cook.match(/(HA=.+?);/)[1];
							let cookie2 =cook.match(/(HA=.+?);/)[1];
							let cookie3 =cook.match(/(HB=.+?);/)[1];
							let cookie4 =cook.match(/(HC=.+?);/)[1];
							let cookie5 =cook.match(/(HD=.+?);/)[1];
							let cookie6 =cook.match(/(HG=.+?);/)[1];
							let cookie7 =cook.match(/(HH=.+?);/)[1];
							let cookie8 =cook.match(/(HK=.+?);/)[1];
							let cookie9 =cook.match(/(HO=.+?);/)[1];
							let cookie10 =cook.match(/(HY=.+?);/)[1];
							let cookie11 =c2;
							let cookie12 =c4;
							let cookie13 =c5;
							let cookie14 =cook.match(/(Hm_p1vt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
	 let fin = [cookie1,cookie2,cookie3,cookie4,cookie5,cookie6,cookie7,cookie8,cookie9,cookie10,cookie11,cookie12,cookie13,cookie14]
	 let finC = fin.join('; ');
		//console.log(response);
							//console.log(cookie);
		request.post('http://shanghaicity.openservice.kankanews.com/public/bus/Getstop')
	 // .set('Accept', '*/*')
	 // .set('Host', 'shanghaicity.openservice.kankanews.com')
	.set(baseH)
	.set('Cookie',finC)	
  // .set('Content-Type','application/x-www-form-urlencoded')
   // .set('User-Agent', userAgent)
	.type("form")
	//.set('Cookie','Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFrgBI1ZtQehHGwBAg==; _ga=GA1.2.610622215.1524630670; _gat=1; Hm_lvt_6f69830ae7173059e935b61372431b35=1524617432,1524617445,1524619410,1524620683; Hm_1vt_6f69830ae7173059e935b61372431b35=eSgsNFrgBJ5ZtQehHGxBAg==; Hm_lpvt_6f69830ae7173059e935b61372431b35=1524630687; HH=62a591244fd688264fb6931a83f9102ebd718282; HK=4f9106f1ece1c7d5c148554763995cf9509b1556; HG=e5df8244d3b2c699c5109f44a4a5ea93564c1d9d; HA=d3a60b5acadc502d42b71f9aecc85eb52a1c14ad; HB=ZDNhNjBiNWFjYWRjNTAyZDQyYjcxZjlhZWNjODVlYjUyYTFjMTRhZA==; HC=9edfe983d41edad254d4e13890323ef3404d2296; HD=MjAxODA0MjU=; HY=MjAxODA0MjU=4f9106f1ece1c7d5c148554763995cf9509b1556e5df8244d3b2c699c5109f44a4a5ea93564c1d9dd6e9f8c8ef2d4dcdb59884ad640290bd7afc9729; HO=TWpBeE9EQTBNalU9MTJNVEUyTWpNeTMxVFc5NmFXeHNZUzgxTGpBZ0tFMWhZMmx1ZEc5emFEc2dWVHNnU1c1MFpXd2dUV0ZqSUU5VElGZ2dNVEJmTmw4MU95QmtaUzFrWlNrZ1FYQndiR1ZYWldKTGFYUXZOVE0wTGpFMUt5QW9TMGhVVFV3c0lHeHBhMlVnUjJWamEyOHBJRlpsY25OcGIyNHZOUzR3TGpNZ1UyRm1ZWEpwTHpVek15NHhPUzQwZDZlOWY4YzhlZjJkNGRjZGI1OTg4NGFkNjQwMjkwYmQ3YWZjOTcyOQ==')
  .send({
  stoptype:direction,
  stopid:stopId,
  sid:sid})
    .end((err,json) => {
      // 处理数据
	console.log(json)
    arr = {};
    res.json(arr)
    })
  
  })
	})
		
		
		
		})

	




  //axios.post('http://shanghaicity.openservice.kankanews.com/public/bus/Getstop',para,{headers: {'Content-Type': 'application/x-www-form-urlencoded','User-Agent':'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'},})
  //.then(json => {
  //   arr = json.data
  //}).then(()=>{
   // res.json(arr)
  //})
  //.catch(err => console.log(err))
});

app.get('/astro/fortune/:astroid', (req,res,next)=>{
  let astroid = req.params.astroid;
  let arr
  axios.get('http://api.jisuapi.com/astro/fortune?appkey=adfb0e1348ec0adf',{params:{astroid:astroid}})
  .then(json => {
     arr = json.data
  }).then(()=>{
    res.json(arr)
  })
  .catch(err => console.log(err))
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
