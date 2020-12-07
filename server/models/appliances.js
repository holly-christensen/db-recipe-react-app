const db = require('../database/index.js');

class Appliances {

  static getAllAppliances(callback) {
    db._query('SELECT appliance_id, appliance_name from Appliance ORDER BY appliance_name', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}

module.exports = Appliances;
