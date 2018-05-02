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
//天气接口
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
//公交名查询id
app.get('/busname/:name',(req,res,next)=>{
  let name = req.params.name;
  let base1 = {
    Accept:'*/*',
  'Accept-Encoding':'gzip, deflate',
  'Cache-Control':'no-cache',
      Connection:'keep-alive',
      'Content-Length':42,
      Origin:'http://shanghaicity.openservice.kankanews.com',
  Referer:'http://shanghaicity.openservice.kankanews.com/',
Pragma:'no-cache',
  Host:'shanghaicity.openservice.kankanews.com',
  'User-Agent':'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'
}
  request.post('http://shanghaicity.openservice.kankanews.com/public/bus/get')
  // .set(base1)
  .type("form")
  .send({ idnum: name })
  .end((err,resp)=>{
    if (err) {
      return next(err);
    }
    // console.log(resp)
    // arr = resp.data;
    res.json(JSON.parse(resp.text))
  })
})
//公交接口查询实时
app.get('/bus/:sid/:direction/:stopId', (req,res,next)=>{
  let sid = req.params.sid;
  let direction = req.params.direction;
  let stopId = req.params.stopId;
  let arr;
  let para = {
  stoptype:direction,
  stopid:stopId,
  sid:sid}
  let ref = `http://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/${sid}`
  let baseH = {
        Accept:'*/*',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.9',
        Connection:'keep-alive',
        'Content-Length':57,
        Host:'shanghaicity.openservice.kankanews.com',
        Origin:'http://shanghaicity.openservice.kankanews.com',
        Referer:ref,
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
   let base2 = {
          Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.9',
            'Cache-Control':'max-age=0',
            Connection:'keep-alive',
        Host:'shanghaicity.openservice.kankanews.com',
        'Upgrade-Insecure-Requests':1,
        'User-Agent':'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'
  }
  let c1,c2,c3,c4,c5;
	request.get('https://hm.baidu.com/hm.gif?cc=0&ck=1&cl=24-bit&ds=375x667&vl=667&et=0&ja=0&ln=zh-cn&lo=0&lt=1524620683&rnd=719889793&si=6f69830ae7173059e935b61372431b35&v=1.2.30&lv=3&ct=!!&tt=%E4%B8%8A%E6%B5%B7%E5%8F%91%E5%B8%83-%E5%B8%82%E6%94%BF%E5%A4%A7%E5%8E%85&sn=34872')
		.end((err,hr)=>{
      if (err) {
        return next(err);
      }
		 c1 = hr.headers['set-cookie'].join(',').match(/(HMACCOUNT=.+?);/)[1];
		//console.log(hr);
		//console.log(c1);
        request.get('http://shanghaicity.openservice.kankanews.com')
              .set(base2)
              .end((err,hrr)=>{
                if (err) {
                  return next(err);
                }
                //console.log(hrr.headers['set-cookie'])
                c2 = hrr.headers['set-cookie'].join(',').match(/(Hm_1vt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
                c4 = 'Hm_lvt_6f69830ae7173059e935b61372431b35=1524617432,1524617445,1524619410,1524620683';
                c5 = 'Hm_lpvt_6f69830ae7173059e935b61372431b35='+new Date().valueOf();
              //console.log(c2);
                c3 = c1+'; '+c2+ '; _gat=1';
            //console.log(c3);
					 	request.get('http://shanghaicity.openservice.kankanews.com/public/bus')
	              .set(base1)
	             .set('Cookie',c3)
	            .end((err,response)=>{
                if (err) {
                  return next(err);
                }
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
							let cookie14 =cook.match(/(Hm_p1vt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
	 let fin = [cookie1,cookie2,cookie3,cookie4,cookie5,cookie6,cookie7,cookie8,cookie9,cookie10,c2,c4,c5,cookie14]
	 let finC = fin.join('; ');
            request.post('http://shanghaicity.openservice.kankanews.com/public/bus/Getstop')
                .set(baseH)
                .set('Cookie',finC)
                .type("form")
                .send(para)
                .end((err,json) => {
                  // 处理数据
              // console.log(json)
              if (err) {
                return next(err);
              }
                arr = JSON.parse(json.text);
                res.json(arr)
                })
  
            })
	        })	
		})
});
//星座运势
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

app.get('/movie/:type', (req,res,next)=>{
  let type = req.params.type;
  let start = req.query.start;
	 let count = req.query.count;
	 let city = req.query.city;
  let arr
  console.log(type)
  axios.get(`https://douban.uieee.com/v2/movie/${type}`,{params:{start:start,count:count,city:city}})
  .then(json => {
	  console.log(json)
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
