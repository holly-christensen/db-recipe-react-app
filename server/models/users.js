const db = require('../database/index.js');

class Users {

  static retrieveAll(callback) {
    db._query('SELECT first_name from User', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getUser(userId, callback) {
    db._query('SELECT first_name, last_name, username, description from User where user_id = ' + userId, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (user, callback) {
    db._query(
      "INSERT INTO User (first_name, last_name, username, email, password) VALUES ($1)", [user],
      function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }
}

module.exports = Users;
