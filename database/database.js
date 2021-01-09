const usersDB = require('./usersDB.js');

module.exports.newUserObject = usersDB.newUserObject;
module.exports.register = usersDB.register;
module.exports.getSecrets = usersDB.getSecrets;
module.exports.addNewSecret = usersDB.addNewSecret;

module.exports.passportConfig = usersDB.passportConfig;
