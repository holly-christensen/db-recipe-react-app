const db = require('../database/index.js');

class Users {

  static getAllUsers(callback) {
    db._query('SELECT first_name, username from User', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getPantry(username, callback) {
    db._query('SELECT DISTINCT ingredient_id, ingredient_name FROM Pantry LEFT JOIN User USING(user_id) LEFT JOIN Ingredient USING(ingredient_id) WHERE username = \'' + username + '\'', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getSaved(username, callback) {
    db._query('SELECT recipe_id, title FROM Save LEFT JOIN User USING(user_id)  LEFT JOIN Recipe USING(recipe_id)  WHERE username = \'' + username + '\' ORDER BY date_saved DESC', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }


  static getRecTrending(username, callback) {
    db._query('call recommendTrending()', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getUserProfile(username, callback) {
    db._query('SELECT first_name, last_name, username, description from User where username = \'' + username + '\'', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getUserId(username, callback) {
    db._query('SELECT user_id FROM User WHERE username = \'' + username + '\'', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //________INSERTS_____________

  static addToPantry(user_id, ingredient_id, callback) {
    db._query(
      'INSERT INTO Pantry VALUES (\'' + user_id + '\', \'' + ingredient_id + '\')',
      function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }

  static addUser(first_name, last_name, username, password, email, callback) {
    db._query(
      'INSERT INTO User (first_name, last_name, username, email, password) VALUES (\'' + first_name + '\', \'' + last_name +'\', \'' + username +'\', \'' + email + '\', \'' + password + '\')',
      function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }
}

module.exports = Users;
