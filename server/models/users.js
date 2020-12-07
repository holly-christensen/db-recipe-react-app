const db = require('../database/index.js');

class Users {

  static getAllUsers(callback) {
    db._query('SELECT first_name, username from User', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getPantry(user_id, callback) {
    db._query('SELECT DISTINCT ingredient_id, ingredient_name FROM Pantry LEFT JOIN User USING(user_id) LEFT JOIN Ingredient USING(ingredient_id) WHERE user_id = \'' + user_id + '\' ORDER BY ingredient_name', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getNotInPantry(user_id, callback) {
    db._query('CALL ingredientsNotInPantry(' + user_id + ')', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res[0]);
    });
  }


  static getSaved(user_id, callback) {
    db._query('SELECT recipe_id, title, r.description FROM Save s LEFT JOIN User u USING(user_id)  LEFT JOIN Recipe r USING(recipe_id)  WHERE s.user_id =' + user_id + ' ORDER BY date_saved DESC', (err, res) => {
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

  static addToSave(user_id, recipe_id, callback) {
    db._query(
      'INSERT INTO Save (user_id, recipe_id) VALUES (\'' + user_id + '\', \'' + recipe_id + '\')',
      function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }

  //________DELETES_____________

  static removeFromPantry(user_id, ingredient_id, callback) {
    db._query(
      'DELETE FROM Pantry WHERE user_id = \'' + user_id + '\'AND ingredient_id = \'' + ingredient_id + '\'',
      function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }

  static removeFromSave(user_id, recipe_id, callback) {
    db._query(
      'DELETE FROM Save WHERE user_id = \'' + user_id + '\' AND recipe_id = \'' + recipe_id + '\'',
      function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }


}

module.exports = Users;
