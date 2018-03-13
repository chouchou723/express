var express = require('express');
var router = express.Router();
var path = require('path')
// const root = {root:path.join(__dirname,'../public/html')}
const spa = {root:path.join(__dirname,'../public/reactspa')}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile('index.html',root)
  res.sendFile('index.html',spa)
  
});
module.exports = router;
