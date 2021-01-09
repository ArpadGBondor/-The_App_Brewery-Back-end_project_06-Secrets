// const passport = require('passport');
// const log = require('../log.js');
const db = require('../database/database.js');

// Check authentication for each route
function checkAuthentication(req,res,next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error',"You need to log in first.")
    res.redirect('/login');
  }
}

module.exports = (app) => {
  app.get('/secrets',checkAuthentication,(req,res)=>{
    db.getSecrets(
      (secrets)=>{
        res.render('secrets',{
          success: req.flash('success'),
          secrets: secrets
        });
      },
      (err)=>{
        console.error(err);
        res.send(err);
      }
    )
  });

  app.get('/submit',checkAuthentication,(req,res)=>{
    res.render('submit',{success:req.flash('success')});
  });

  app.post('/submit',checkAuthentication,(req,res)=>{
    const newSecret = req.body.secret;
    db.addNewSecret(req.user._id,newSecret,
      ()=>{
        req.flash('success',"Successfully submitted your secret.")
        res.redirect('/secrets');
      },
      (err)=>{
        console.error(err);
        res.send(err);
      }
    )
  });
};
