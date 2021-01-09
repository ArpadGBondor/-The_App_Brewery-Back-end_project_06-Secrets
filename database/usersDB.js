const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// const log = require('../log.js');
const findOrCreate = require('mongoose-findorcreate')
const passportConfig = require('./passportConfig.js');

// MongoDB connection
mongoose.connect(process.env.DB_USER_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Collections
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  secret: String,
  googleId: String,
  facebookId: String,
  githubId: String
});
userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User',userSchema);

module.exports = {
  newUserObject(username,password,callback) {
    const user = new User({
      username: username,
      password: password
    });
    if (callback === null)
      return user;
    callback(user);
  },

  register(username,password,okCallback,userExistsCallback,errorCallback) {
    User.register({username:username},password,(err,user)=>{
      if (err) {
        if ( err.name && err.name === 'UserExistsError') {
          userExistsCallback();
        } else {
          errorCallback(err);
        }
      } else {
        okCallback(user);
      }
    })
  },

  getSecrets(okCallback,errorCallback) {
    User.find({secret: {$ne: null}},{_id:0,secret:1},(err,secrets)=>{
      if (err) {
        errorCallback(err);
      } else {
        okCallback(secrets);
      }
    });
  },

  addNewSecret(userId,secret,okCallback,errorCallback) {
    User.findByIdAndUpdate(userId,{ $set: { secret: secret }},(err,user)=>{
      if (err) {
        errorCallback(err);
      } else {
        okCallback(user);
      }
    });
  }
}

module.exports.passportConfig = (passport)=>{passportConfig.passportConfig(User,passport);}
