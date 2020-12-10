const db = require('../database/index.js');

class Appliances {

  static getAllTags(callback) {
    db._query('SELECT tag_id, tag_name from Tag ORDER BY tag_name', (err, res) => {
      if(err.error)
        return callback(err);
      callback(res);
    });
  }

}

module.exports = Appliances;
