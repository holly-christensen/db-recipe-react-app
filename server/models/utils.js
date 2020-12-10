const db = require('../database/index.js');

class Utils {

  //________GET_________

  static getHome(callback) {
    db._query('SELECT \'UTILS\'', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getLastId(callback) {
    db._query('SELECT MAX(recipe_id) FROM Recipe;', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }


  //________POST_________


  //________DELETE_________



}

module.exports = Utils;
