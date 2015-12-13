var express = require('express');
var router = express.Router();

/* GET home page. */

console.log('pasamos por routes index.js');


router.get('/ajax', function(req, res, next) {

  var ababool = require("../ababool.json");
  var theurl = req.url.substr(1);

  for (i in ababool.pages)  {
    if(ababool.pages[i]['default']==1) var current = i;
  }

  for (i in ababool.pages)  {
    if(theurl==i) var current = i;
  }

  res.render('ajax', { cur:current, url: theurl, pages: ababool.pages, title: 'Ababool' });
});

router.get('/*', function(req, res, next) {

  var ababool = require("../ababool.json");
  var theurl = req.url.substr(1);

  for (i in ababool.pages)  {
    if(ababool.pages[i]['default']==1) var current = i;
  }

  for (i in ababool.pages)  {
    if(theurl==i) var current = i;
  }

  res.render('index', { cur:current, url: theurl, pages: ababool.pages, title: 'Ababool' });
});

module.exports = router;
