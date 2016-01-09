var express = require('express');
var router = express.Router();

// the Ababool vars
var ababool = require("../config/pages.json");
// the url query

var Controller = require ('./controller');


router.get('/api/persona', Controller.getPersona);
// Crear una nueva Persona
router.post('/api/persona', Controller.setPersona);
// Modificar los datos de una Persona
router.put('/api/persona/:persona_id', Controller.updatePersona);
// Borrar una Persona
router.delete('/api/persona/:persona_id', Controller.removePersona);


router.get('/ajax', function(req, res, next) {

  var theurl = req.url.substr(1);

  var current = '';

  // find the default page
  for (i in ababool.pages)  {
    if(ababool.pages[i]['default']==1) current = i;
  }

  // if there is a id request then the current page is the id requested
  for (i in ababool.pages)  {
    if(theurl==i) current = i;
  }

  res.render('ajax', { id:req.query.id, cur:current, url: theurl, pages: ababool.pages, title: 'Ababool' });
});

// router for all other peticions
router.get('/*', function(req, res, next) {
  //render the view

  var theurl = req.url.substr(1);

  var current = '';

  // find the default page
  for (i in ababool.pages)  {
    if(ababool.pages[i]['default']==1) current = i;
  }

  // if there is a id request then the current page is the id requested
  for (i in ababool.pages)  {
    if(theurl==i) current = i;
  }

  res.render('index', { cur:current, url: theurl, pages: ababool.pages, title: 'Ababool' });
});

module.exports = router;
