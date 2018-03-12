var express = require('express');
var router = express.Router();
var path = require('path')
// const root = {root:path.join(__dirname,'../public/html')}
const root = {root:path.join(__dirname,'../public/Portfolio-page')}

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.headers)
  let array = ['nokia', 'sony', 'ericsson', 'mot', 'samsung', 'htc', 'sgh', 'lg', 'sharp', 'sie-'
  ,'philips', 'panasonic', 'alcatel', 'lenovo', 'iphone', 'ipod', 'blackberry', 'meizu', 
  'android', 'netfront', 'symbian', 'ucweb', 'windowsce', 'palm', 'operamini', 
  'operamobi', 'opera mobi', 'openwave', 'nexusone', 'cldc', 'midp', 'wap', 'mobile'];
  let a = req.headers['user-agent'].toLowerCase();;
  console.log(a)
  let b =a.split('(')[1].split(';')[0];
  if(array.includes(b)){
res.redirect('/home');
  }else{
    res.sendFile('chouchou.html',root)

  }
  // res.render('index', { title: 'Express' });
  // res.sendFile('index.html',root)
  
});
router.get('/search', function(req, res, next) {
  res.render('index', { title: req.query.q });
});
module.exports = router;
