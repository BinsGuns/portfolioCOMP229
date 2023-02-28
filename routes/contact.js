var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user) {
    res.render('contact', { title: 'Contact' });
  }else{
    res.render('login',{ title: 'Sign In' });
  }
  
});

module.exports = router;
