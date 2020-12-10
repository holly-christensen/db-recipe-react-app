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
    const query = 'SELECT recipe_id, title, description, photo, minutes, servings, instructions FROM Recipe WHERE recipe_id = '+ recipe_id;
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

  //get ingredients for a specific recipe
  static getRecipeIngredients(recipe_id, callback) {
    const query = 'SELECT DISTINCT ingredient_id, ingredient_name FROM Recipe_ingredient LEFT JOIN Ingredient USING (ingredient_id) WHERE recipe_id = '+ recipe_id;
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //get tags for a specific recipe
  static getRecipeTags(recipe_id, callback) {
    const query = 'SELECT DISTINCT tag_id, tag_name FROM Recipe_tag LEFT JOIN Tag USING (tag_id) WHERE recipe_id = '+ recipe_id;
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //get appliances for a specific recipe
  static getRecipeAppliances(recipe_id, callback) {
    const query = 'SELECT DISTINCT appliance_id, appliance_name FROM Recipe_appliance LEFT JOIN Appliance USING (appliance_id) WHERE recipe_id = '+ recipe_id;
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }



  //________POST_________


  static createRecipe(user_id, title, description, photo, minutes, servings, instructions, callback) {
    db._query(
      `INSERT INTO Recipe (user_id, title, description, photo, minutes, servings, instructions) VALUES (` + user_id + `, \"` + title + `\", \"` + description +`\", \"` + photo + `\",` + minutes + `,` + servings + `, \"` + instructions +`\")`,
      function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }

  static addRecipeIngredient(recipe_id, ingredient_id, amount, unit, optional, callback) {
    const query = `INSERT INTO Recipe_ingredient (recipe_id, ingredient_id, amount, unit, optional) VALUES (` + recipe_id + `, ` + ingredient_id + `, ` + amount +`, \"` + unit + `\",` + optional +`)`;
    db._query(query, function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }

  static addRecipeAppliance(recipe_id, appliance_id, callback) {
    const query = `INSERT INTO Recipe_appliance (recipe_id, appliance_id) VALUES (` + recipe_id + `, ` + appliance_id +`)`;
    db._query(query, function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }

  static addRecipeTag(recipe_id, tag_id, callback) {
    const query = `INSERT INTO Recipe_tag (recipe_id, tag_id) VALUES (` + recipe_id + `, ` + tag_id +`)`;
    db._query(query, function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }



  //________DELETE_________



}

module.exports = Recipes;
