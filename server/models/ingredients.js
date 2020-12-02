const db = require('../database/index.js');

class Ingredients {

  static getAllIngredients(callback) {
    db._query('SELECT ingredient_name from Ingredient ORDER BY ingredient_name', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  static getIngredientId(ingredient_name, callback) {
    db._query('SELECT ingredient_id from Ingredient WHERE ingredient_name = \'' + ingredient_name + '\'', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }


}

module.exports = Ingredients;
