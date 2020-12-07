const db = require('../database/index.js');

class Recipes {

  //________GET_________

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
  static getRecipeInfo(recipe_id, callback) {
    const query = 'SELECT recipe_id, title, description, photo, minutes, servings FROM Recipe WHERE recipe_id = '+ recipe_id;
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //get all recipes in database
  static getAllRecipes(callback) {
    const query = 'SELECT recipe_id, title, description FROM Recipe';
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //________POST_________


  static addNewRecipe (user, callback) {
    // db._query(
    //   "INSERT INTO User (first_name, last_name, username, email, password) VALUES ($1)", [user],
    //   function(err,res) {
    //     if(err.error)
    //       return callback(err);
    //     callback(res);
    // });
  }


  //________DELETE_________



}

module.exports = Recipes;
