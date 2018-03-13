var express = require('express');
var router = express.Router();
var path = require('path')
// const root = {root:path.join(__dirname,'../public/html')}
const home = {root:path.join(__dirname,'../public/reactSPA')}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile('index.html',root)
  res.sendFile('index.html',home)
  
});
module.exports = router;
