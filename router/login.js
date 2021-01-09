const passport = require('passport');
// const log = require('../log.js');
const db = require('../database/database.js');

module.exports = (app) => {

  app.get('/login',(req,res)=>{
    // log('login flash() :',req.flash());
    res.render('login',{error:req.flash('error')});
  });

  app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    db.newUserObject(username,password,((user)=>{
      req.login(user, (err)=>{
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          passport.authenticate('local',{
            successRedirect: '/secrets',
            successFlash: 'Successfully logged in as: ' + username,
            failureRedirect: '/login',
            failureFlash: 'Invalid username or password.'
          })(req,res);
        }
      });
    }));
  });

  app.get('/logout', function(req, res){
    req.logout();
    req.flash('success','Successfully logged out.')
    res.redirect('/');
  });

  app.get('/register',(req,res)=>{
    res.render('register',{error:req.flash('error')});
  });


  app.post('/register',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    db.register(
      username,
      password,
      ()=>{
        passport.authenticate('local',{
          successRedirect: '/secrets',
          successFlash: 'Successfully registered as: ' + username,
          failureRedirect: '/login',
          failureFlash: 'Invalid username or password.'
        })(req,res);
      },
      ()=>{
        req.flash('error', username + ' is already registered.')
        res.redirect('/register');
      },
      (err)=>{
        console.error(err);
        res.send(err);
      }
    );
  });

  // Login with google
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login', failureFlash: 'Google authentication failed.' }),
    function(req, res) {
      // Successful authentication, redirect secrets.
      req.flash('success','Successfully logged in using Google.')
      res.redirect('/secrets');
    });

    //login with facebook
    app.get('/auth/facebook',
      passport.authenticate('facebook'));

    app.get('/auth/facebook/secrets',
      passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        req.flash('success','Successfully logged in using Facebook.')
        res.redirect('/secrets');
      });

      //login with GitHub
      app.get('/auth/github',
        passport.authenticate('github', { scope: [ 'user:email' ] }));

      app.get('/auth/github/secrets',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {
          // Successful authentication, redirect home.
          req.flash('success','Successfully logged in using GitHub.')
          res.redirect('/secrets');
      });
};
