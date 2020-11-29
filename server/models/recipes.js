const db = require('../database/index.js');

class Recipes {

  //get ingredients for the given recipe
  static getIngredients(recipeId, callback) {
    const query = 'select ingredient_name, amount, unit from Recipe_ingredient left join Ingredient using(ingredient_id) where recipe_id = '+ recipeId;
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //get metadata for the given recipe
  static getRecipeInfo(recipeId, callback) {
    const query = 'select title, description, photo, minutes, servings from Recipe where recipe_id = '+ recipeId;
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //get all recipes in database
  static getAllRecipes(callback) {
    const query = 'select title from Recipe';
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }


  static insert (user, callback) {
    // db._query(
    //   "INSERT INTO User (first_name, last_name, username, email, password) VALUES ($1)", [user],
    //   function(err,res) {
    //     if(err.error)
    //       return callback(err);
    //     callback(res);
    // });
  }
}

module.exports = Recipes;
