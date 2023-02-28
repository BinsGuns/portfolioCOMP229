var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.session.user) {
    res.render('projects', { title: 'My Projects' });
  }else{
    res.render('login',{ title: 'Sign In' });
  }
});

module.exports = router;
