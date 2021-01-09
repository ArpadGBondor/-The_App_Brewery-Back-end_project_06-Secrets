// const log = require('../log.js');
module.exports = (app) => {

  app.get('/',(req,res)=>{
    res.render('home',{
      info:req.flash('info'),
      error:req.flash('error'),
      success:req.flash('success')});
  });
};
