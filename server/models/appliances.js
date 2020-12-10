const db = require('../database/index.js');

class Appliances {

  static getAllAppliances(callback) {
    db._query('SELECT appliance_id, appliance_name from Appliance ORDER BY appliance_name', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

  //______POST______

  static addRecipeAppliance(recipe_id, appliance_id, callback) {
    const query = `INSERT INTO Recipe_appliance (recipe_id, appliance_id) VALUES (` + recipe_id + `, ` + appliance_id +`)`;
    db._query(query, function(err,res) {
        if(err.error)
          return callback(err);
        callback(res);
    });
  }

}

module.exports = Appliances;
