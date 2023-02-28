var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const {MongoClient, ServerApiVersion} = require("mongodb");

const uri = "mongodb+srv://vincegunday17:SeSGBgk86J6vEtFd@cluster0.zie08kj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const myDB = client.db("comp229_db");
const myColl = myDB.collection("users");


passport.use(new LocalStrategy(function verify(username, password, cb) {

   const cursor =  myColl.find({username : username});
   
   cursor.forEach(data =>{
     crypto.pbkdf2(password, 'salt', 310000, 32, 'sha256', function(err, hashedPassword) {
     
       if (err) { return cb(err); }
       
       if (!crypto.timingSafeEqual(data.password.read(0,data.password.length), hashedPassword)) {
           console.log('Incorrect pass')
         return cb(null, false, { message: 'Incorrect username or password.' });
       }
       return cb(null, data);
       });
   });
}));

passport.serializeUser(function(user, cb) {
    
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.get('/login', function(req, res, next) {
    
  res.render('login',{ title: 'Sign In' });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/business',
  failureRedirect: '/login'
}));

module.exports = router;