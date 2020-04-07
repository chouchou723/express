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
var cheerio = require('cheerio');
var rlencode = require('urlencode');


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
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/Portfolio-page'), {
    maxAge: 864000
}));
// app.all("*", (req, res, next) => {    
//     let host = req.headers.host;
//     host = host.replace(/\:\d+$/, ''); // Remove port number
//     res.redirect(307, `https://${host}${req.path}`);
// });

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
app.get('/weather/:city', (req, res, next) => {
    let city = req.params.city;
    let arr
    axios.get('http://api.jisuapi.com/weather/query?appkey=adfb0e1348ec0adf', {
            params: {
                city: city
            }
        })
        .then(json => {
            arr = json.data
        }).then(() => {
            res.json(arr)
        })
        .catch(err => console.log(err))
});

//获取全部公交列表
app.get('/allbuslist', (req, res, next) => {
    let url = 'https://shanghaicity.openservice.kankanews.com/public/bus';
    axios.get(url).then(json => {
        let d = json.data;
        let $ = cheerio.load(d);
        console.log(d)
        let list
        $('script').each(function (i, e) {
            		console.log($(this).html())
            if ($(this).html().indexOf('119') > -1) {
                let d = ($(this).html().split('[')[1].split(']')[0]);
                		console.log(eval('('+('['+d+']')+')'))
                // 				let t = $(this).html().replace(/[\r\n]/g,'').match(/data.*/g)[0].split('=')[1].replace(/\s/g,'');
                // 				console.log(t)
                list = eval('(' + ('[' + d + ']') + ')') //(t.split('[')[1].split(']')[0]).replace(/\'/g,'').split(',')
                // 	return;
            }
        })
       		console.log(list,1)
        return list
    }).then((list) => {
        // 		   let fdata = JSON.parse(JSON.stringify(list));
        if (list) {
            res.send({
                allLines: list
            })
        } else {
            res.sendStatus(500)
        }

    }).catch(err => {
        res.sendStatus(500);
        console.log(err)
    })
})
var bba =  {  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                              'Host': 'shanghaicity.openservice.kankanews.com',
              // Origin:'https://shanghaicity.openservice.kankanews.com',
               'Referer': 'https://shanghaicity.openservice.kankanews.com/public/bus',
                'Upgrade-Insecure-Requests': '1'
};
// var ba = let ba =  {
//                    Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//                                      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
//                               'Host': 'shanghaicity.openservice.kankanews.com',
//                 Referer: 'https://shanghaicity.openservice.kankanews.com/public/bus',
//                 'Upgrade-Insecure-Requests': 1
//                 }
//公交站点
app.get('/busstop/:sid', (req, res, next) => {
    let sid = req.params.sid;
    console.log(sid,1)
    let data = {}
    let url = `https://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/${sid}`
//     let bba = {  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//                   'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
//                               'Host': 'shanghaicity.openservice.kankanews.com',
//               // Origin:'https://shanghaicity.openservice.kankanews.com',
//                'Referer': 'https://shanghaicity.openservice.kankanews.com/public/bus',
//                 'Upgrade-Insecure-Requests': '1'
// }
     request.get(url).set(bba).then((jsonR) => {
//     axios.get(url, {
            // 	  url:url,
            // 	    responseType:'text',
//             	    headers: {  Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//                                      'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4',
//                               'Host': 'shanghaicity.openservice.kankanews.com'
// }
//         })
//         .then(json => {
//             	  console.log(jsonR)
            let arr = jsonR.text
            let $ = cheerio.load(arr);
            let start_stop = $('.upgoing p span').first().text().trim();
//         console.log(start_stop)
//             if (!start_stop) {
//                 res.sendStatus(500)
//                 return start_stop
//             }
            let end_stop = $('.upgoing p span').eq(1).text().trim();
            	  console.log(end_stop,123)
            let start_earlytime = $('.upgoing .time .s').first().text().trim();
            let start_latetime = $('.upgoing .time .m').first().text().trim();
            let end_earlytime = $('.upgoing .time .s').eq(1).text().trim();
            let end_latetime = $('.upgoing .time .m').eq(1).text().trim();
            let busLine = {
                start_stop,
                end_stop,
                start_earlytime,
                start_latetime,
                end_earlytime,
                end_latetime
            };
            let stops = []
            $('div .station .name').each(function (i, e) {

                stops[i] = {
                    zdmc: $(this).text().trim(),
                    id: 'chou' + i
                }
            })
            let lineResults0 = {
                direction: true,
                stops
            };
            data = {
                busLine,
                lineResults0
            };
        let u1 = `https://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/${sid}?stoptype=1`
//             let ba =  {
//                    Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//                                      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
//                               'Host': 'shanghaicity.openservice.kankanews.com',
//                 Referer: 'https://shanghaicity.openservice.kankanews.com/public/bus',
//                 'Upgrade-Insecure-Requests': 1
//                 }
            request.get(u1).set(bba).end((err,resd) => {
//                 console.log(resd)
                    let $ = cheerio.load(resd.text);
                    let stops = []
                    $('div .station .name').each(function (i, e) {

                        stops[i] = {
                            zdmc: $(this).text().trim(),
                            id: 'chou' + i
                        }
                    })
                    let lineResults1 = {
                        direction: false,
                        stops
                    };
                    data = { ...data,
                        lineResults1
                    };
  let fdata = JSON.parse(JSON.stringify(data));
                    if (!fdata) {
                        res.sendStatus(500);
                        return
                    }
                    res.json(fdata)
        })
//                 .then(() => {
            // 	  if(!start_stop){
            // 		 res.send(500)
            // 		return
            // 	  }
//             let u1 = `https://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/${sid}?stoptype=1`
//             let ba =  {
//                    Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//                                      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
//                               'Host': 'shanghaicity.openservice.kankanews.com',
//                 'Upgrade-Insecure-Requests': 1
//                 }
//             request.get(u1).set(ba).end((err,resd) => {
//                 console.log(resd)
//                     let $ = cheerio.load(resd.data);
//                     let stops = []
//                     $('div .station .name').each(function (i, e) {
// 
//                         stops[i] = {
//                             zdmc: $(this).text().trim(),
//                             id: 'chou' + i
//                         }
//                     })
//                     let lineResults1 = {
//                         direction: false,
//                         stops
//                     };
//                     data = { ...data,
//                         lineResults1
//                     };
//   let fdata = JSON.parse(JSON.stringify(data));
//                     if (!fdata) {
//                         res.sendStatus(500);
//                         return
//                     }
//                     res.json(fdata)
//                 })
//                 .then(() => {
//                     //   console.log(data)
//                     let fdata = JSON.parse(JSON.stringify(data));
//                     if (!fdata) {
//                         res.sendStatus(500);
//                         return
//                     }
//                     res.json(fdata)
//                 })
//                 .catch(err => {
//                     res.sendStatus(500);
//                     console.log(err)
//                 })
//             axios.get(u1, {
//                    Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//                                      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
//                               'Host': 'shanghaicity.openservice.kankanews.com',
//                 'Upgrade-Insecure-Requests': 1
//                 })
//                 .then(resd => {
//                     let $ = cheerio.load(resd.data);
//                     let stops = []
//                     $('div .station .name').each(function (i, e) {

//                         stops[i] = {
//                             zdmc: $(this).text().trim(),
//                             id: 'chou' + i
//                         }
//                     })
//                     let lineResults1 = {
//                         direction: false,
//                         stops
//                     };
//                     data = { ...data,
//                         lineResults1
//                     };

//                 }).then(() => {
//                     //   console.log(data)
//                     let fdata = JSON.parse(JSON.stringify(data));
//                     if (!fdata) {
//                         res.sendStatus(500);
//                         return
//                     }
//                     res.json(fdata)
//                 }).catch(err => {
//                     res.sendStatus(500);
//                     console.log(err)
//                 })


        })
        .catch(err => {
            res.sendStatus(500);
            console.log(err)
        })
});
//公交名查询id
var base1 = {
//         'Accept': '*/*',
//         'Accept-Encoding': 'gzip, deflate, br',
//         'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        //   'Cache-Control':'no-cache',
//         'Connection': 'keep-alive',
//         'Content-Length': 42,
//         'Host': 'shanghaicity.openservice.kankanews.com',
//        Origin: 'https://shanghaicity.openservice.kankanews.com',
//         'Referer': 'https://shanghaicity.openservice.kankanews.com/public/bus',
        // Pragma:'no-cache',
        //   Host:'shanghaicity.openservice.kankanews.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/6.5.10 NetType/WIFI Language/zh_CN',
//         'X-Requested-With': 'XMLHttpRequest'
    }
app.get('/busname/:name', (req, res, next) => {
 var name = req.params.name;//.split('%').length===1?req.params.name.split('%')[0]:req.params.name.split('%')[0]+'路';
//    let name = rlencode.parse(‘idnum:’+req.params.name, {charset: 'utf-8'});
//     var aname = rlencode(name, 'utf-8');
    console.log(name);
//     console.log(rlencode(name, 'utf8'));
//    console.log( rlencode.decode(aname, 'utf-8')); 
//     let base1 = {
// //         'Accept': '*/*',
// //         'Accept-Encoding': 'gzip, deflate, br',
// //         'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
//         //   'Cache-Control':'no-cache',
// //         'Connection': 'keep-alive',
// //         'Content-Length': 42,
// //         'Host': 'shanghaicity.openservice.kankanews.com',
// //        Origin: 'https://shanghaicity.openservice.kankanews.com',
// //         'Referer': 'https://shanghaicity.openservice.kankanews.com/public/bus',
//         // Pragma:'no-cache',
//         //   Host:'shanghaicity.openservice.kankanews.com',
//         'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/6.5.10 NetType/WIFI Language/zh_CN',
// //         'X-Requested-With': 'XMLHttpRequest'
//     }
//         .type("form")

   request.post('https://shanghaicity.openservice.kankanews.com/public/bus/get').set(base1).type('form').send({ idnum:name}).then((resp) => {
        console.log(resp)
//            if (err) {
//                res.sendStatus(500);
//                return next(err);
//             }
//                 console.log(resp)
//             arr = resp.data;
            if (!resp.text) {
               res.sendStatus(500);
                return
            }
        
            res.json(JSON.parse(resp.text))
        }).catch(err=>{console.log(err)})


})
 var baseH = {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        Connection: 'keep-alive',
        'Content-Length': 57,
        Host: 'shanghaicity.openservice.kankanews.com',
        Origin: 'https://shanghaicity.openservice.kankanews.com',
        Referer: 'https://shanghaicity.openservice.kankanews.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4',
        'X-Requested-With': 'XMLHttpRequest'
    }
    var baseH1 = {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        Connection: 'keep-alive',
        Referer: 'https://shanghaicity.openservice.kankanews.com/',

        Host: 'shanghaicity.openservice.kankanews.com',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'
    }
    //获取垃圾分类
//     var garbageBase = {
//     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
// 'Accept-Encoding': 'gzip, deflate',
// 'Accept-Language': 'zh-CN,zh;q=0.9',
// Host:'weixin.sh-service.com',
// Referer: 'http://weixin.sh-service.com/sites/feiguan/trashTypes_2/TrashQuery.aspx',
// 'Upgrade-Insecure-Requests': 1,
// 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
// }
app.get('/searchGarbage/:search',(req,res,next)=>{
    
        let search = req.params.search;
     var str =encodeURI(search);
//     console.log(str)
      let url = 'http://trash.lhsr.cn/sites/feiguan/trashTypes_3/TrashQuery.aspx'
        let url1 = 'http://trash.lhsr.cn/sites/feiguan/trashTypes_3/TrashQuery.aspx?kw='+str
//     console.log(url1)
//           var garbageBase1 = {
//     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
// 'Accept-Encoding': 'gzip, deflate',
// 'Accept-Language': 'zh-CN,zh;q=0.9',
// Host:'weixin.sh-service.com',
// Referer:url1,
// 'Upgrade-Insecure-Requests': 1,
// 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
// }
         request.get(url).end((error,respo)=>{
              let c1 = respo.headers['set-cookie'].join(',').match(/(ASP.NET_SessionId=.+?);/)[1];
              request.get(url1).set('Cookie', c1).end((err,resp)=>{
                    let arr = resp.text
            let $ = cheerio.load(arr);
                  let title =  $('.info p span').eq(0).text().trim();
                  let content =  $('.kp2 .title div').eq(0).text().trim();
                  let desc =  $('.kp2 .desc').eq(0).text().trim();
//                   let li =  $('.kp2 ul li').join(',').text().trim();
                 let li =[]
                 $('.kp2 ul li').each(function(i, elem){
  li[i]= $(this).text();});

let list = li.join(', ');
//                       console.log(title,content,desc,list)
                    if (err) {
                        res.sendStatus(500);
                        return next(err);
                    }
                  let d = {
                      title,content,desc,list
                  }
                   let fdata = JSON.parse(JSON.stringify(d));
                    if (!fdata) {
                        res.sendStatus(500);
                        return
                    }
                    res.json(fdata)
              })
 
         })
        })
//公交接口查询实时
app.get('/bus/:sid/:direction/:stopId', (req, res, next) => {
    let sid = req.params.sid;
    let direction = req.params.direction;
    let stopId = req.params.stopId;
    let arr;
    let para = {
        stoptype: direction,
        stopid: stopId,
        sid: sid
    }
    let ref = `https://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/${sid}`
//     let baseH = {
//         Accept: '*/*',
//         'Accept-Encoding': 'gzip, deflate',
//         'Accept-Language': 'zh-CN,zh;q=0.9',
//         Connection: 'keep-alive',
//         'Content-Length': 57,
//         Host: 'shanghaicity.openservice.kankanews.com',
//         Origin: 'https://shanghaicity.openservice.kankanews.com',
//         Referer: ref,
//         'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4',
//         'X-Requested-With': 'XMLHttpRequest'
//     }
//     let base1 = {
//         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//         'Accept-Encoding': 'gzip, deflate',
//         'Accept-Language': 'zh-CN,zh;q=0.9',
//         Connection: 'keep-alive',
//         Referer: 'https://shanghaicity.openservice.kankanews.com/',

//         Host: 'shanghaicity.openservice.kankanews.com',
//         'Upgrade-Insecure-Requests': 1,
//         'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'
//     }
    request.get('https://shanghaicity.openservice.kankanews.com/public/bus')
        .set(baseH1)
        .end((err, response) => {
            if (err) {
                res.sendStatus(500);
                return next(err);
            }
            let c1 = response.headers['set-cookie'].join(',').match(/(acw_tc=.+?);/)[1];
            // 	    console.log(c1);
            request.post('https://shanghaicity.openservice.kankanews.com/public/bus/Getstop')
                .set(baseH)
                .set('Cookie', c1)
                .type("form")
                .send(para)
                .end((err, json) => {
                    // 处理数据
                    //               console.log(json)
                    if (err) {
                        res.sendStatus(500);
                        return next(err);
                    }
                    arr = JSON.parse(json.text);
                    if (!arr) {
                        res.sendStatus(500);
                        return
                    }
                    res.json(arr)
                })
        })

    //   let base1 = {
    //           Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    //         'Accept-Encoding':'gzip, deflate',
    //         'Accept-Language':'zh-CN,zh;q=0.9',
    //             Connection:'keep-alive',
    //         Referer:'http://shanghaicity.openservice.kankanews.com/',

    //         Host:'shanghaicity.openservice.kankanews.com',
    //         'Upgrade-Insecure-Requests':1,
    //         'User-Agent':'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'
    //   }
    //    let base2 = {
    //           Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    //         'Accept-Encoding':'gzip, deflate',
    //         'Accept-Language':'zh-CN,zh;q=0.9',
    //             'Cache-Control':'max-age=0',
    //             Connection:'keep-alive',
    //         Host:'shanghaicity.openservice.kankanews.com',
    //         'Upgrade-Insecure-Requests':1,
    //         'User-Agent':'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; de-de) AppleWebKit/534.15+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4'
    //   }
    //   let c1,c2,c3,c4,c5;
    // 	request.get('https://hm.baidu.com/hm.gif?cc=0&ck=1&cl=24-bit&ds=375x667&vl=667&et=0&ja=0&ln=zh-cn&lo=0&lt=1524620683&rnd=719889793&si=6f69830ae7173059e935b61372431b35&v=1.2.30&lv=3&ct=!!&tt=%E4%B8%8A%E6%B5%B7%E5%8F%91%E5%B8%83-%E5%B8%82%E6%94%BF%E5%A4%A7%E5%8E%85&sn=34872')
    // 		.end((err,hr)=>{
    //       if (err) {
    //         return next(err);
    //       }
    // 		 c1 = hr.headers['set-cookie'].join(',').match(/(HMACCOUNT=.+?);/)[1];
    // 		//console.log(hr);
    // 		//console.log(c1);
    //         request.get('http://shanghaicity.openservice.kankanews.com')
    //               .set(base2)
    //               .end((err,hrr)=>{
    //                 if (err) {
    //                   return next(err);
    //                 }
    //                 //console.log(hrr.headers['set-cookie'])
    //                 c2 = hrr.headers['set-cookie'].join(',').match(/(Hm_1vt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
    //                 c4 = 'Hm_lvt_6f69830ae7173059e935b61372431b35=1524617432,1524617445,1524619410,1524620683';
    //                 c5 = 'Hm_lpvt_6f69830ae7173059e935b61372431b35='+new Date().valueOf();
    //               //console.log(c2);
    //                 c3 = c1+'; '+c2+ '; _gat=1';
    //             //console.log(c3);
    // 					 	request.get('http://shanghaicity.openservice.kankanews.com/public/bus')
    // 	              .set(base1)
    // 	             .set('Cookie',c3)
    // 	            .end((err,response)=>{
    //                 if (err) {
    //                   return next(err);
    //                 }
    // 							let cook = response.headers['set-cookie'].join(',');
    //  	            let cookie1 = cook.match(/(HA=.+?);/)[1];
    // 							let cookie2 =cook.match(/(HA=.+?);/)[1];
    // 							let cookie3 =cook.match(/(HB=.+?);/)[1];
    // 							let cookie4 =cook.match(/(HC=.+?);/)[1];
    // 							let cookie5 =cook.match(/(HD=.+?);/)[1];
    // 							let cookie6 =cook.match(/(HG=.+?);/)[1];
    // 							let cookie7 =cook.match(/(HH=.+?);/)[1];
    // 							let cookie8 =cook.match(/(HK=.+?);/)[1];
    // 							let cookie9 =cook.match(/(HO=.+?);/)[1];
    // 							let cookie10 =cook.match(/(HY=.+?);/)[1];
    // 							let cookie14 =cook.match(/(Hm_p1vt_6f69830ae7173059e935b61372431b35=.+?);/)[1];
    // 	 let fin = [cookie1,cookie2,cookie3,cookie4,cookie5,cookie6,cookie7,cookie8,cookie9,cookie10,c2,c4,c5,cookie14]
    // 	 let finC = fin.join('; ');
    //             request.post('http://shanghaicity.openservice.kankanews.com/public/bus/Getstop')
    //                 .set(baseH)
    //                 .set('Cookie',finC)
    //                 .type("form")
    //                 .send(para)
    //                 .end((err,json) => {
    //                   // 处理数据
    //               // console.log(json)
    //               if (err) {
    //                 return next(err);
    //               }
    //                 arr = JSON.parse(json.text);
    //                 res.json(arr)
    //                 })

    //             })
    // 	        })	
    // 		})
});
//电影详细
app.get('/movie/subject/:id', (req, res, next) => {
    let id = req.params.id;
    let arr
    //   console.log(type)
    axios.get(`https://douban.uieee.com/v2/movie/subject/${id}`)
        .then(json => {
            // 	  console.log(json)
            arr = json.data
        }).then(() => {
            res.json(arr)
        })
        .catch(err => console.log(err))
});

//电影
app.get('/movie/:type', (req, res, next) => {
    let type = req.params.type;
    let start = req.query.start;
    let count = req.query.count;
    let city = req.query.city;
    let arr
    //   console.log(type)
    axios.get(`https://douban.uieee.com/v2/movie/${type}`, {
            params: {
                start: start,
                count: count,
                city: city
            }
        })
        .then(json => {
            // 	  console.log(json)
            arr = json.data
        }).then(() => {
            res.json(arr)
        })
        .catch(err => console.log(err))
});

//星座运势
app.get('/astro/fortune/:astroid', (req, res, next) => {
    let astroid = req.params.astroid;
    let arr
    axios.get('http://api.jisuapi.com/astro/fortune?appkey=adfb0e1348ec0adf', {
            params: {
                astroid: astroid
            }
        })
        .then(json => {
            arr = json.data
        }).then(() => {
            res.json(arr)
        })
        .catch(err => console.log(err))
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
