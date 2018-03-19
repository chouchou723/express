var express = require('express');
var router = express.Router();
var path = require('path')
// const root = {root:path.join(__dirname,'../public/html')}
const home = {root:path.join(__dirname,'../public/home')}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile('index.html',root)
  // let array = ['nokia', 'sony', 'ericsson', 'mot', 'samsung', 'htc', 'sgh', 'lg', 'sharp', 'sie-'
  // ,'philips', 'panasonic', 'alcatel', 'lenovo', 'iphone', 'ipod', 'blackberry', 'meizu', 
  // 'android', 'netfront', 'symbian', 'ucweb', 'windowsce', 'palm', 'operamini', 
  // 'operamobi', 'opera mobi', 'openwave', 'nexusone', 'cldc', 'midp', 'wap', 'mobile'];
  // let a = req.headers['user-agent'].toLowerCase();;
  // let b =a.split('(')[1].split(';')[0];
  // if(array.includes(b)){
  //     res.sendFile('index.html',home);
  // }else{
  //   res.redirect('/')

  // }
  
});
module.exports = router;
