var express = require('express');
var router = express.Router();
var path = require('path')
const home = {root:path.join(__dirname,'../public/pokemon')}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile('index.html',root)
  res.sendFile('poke.html',home)
  
});
module.exports = router;
