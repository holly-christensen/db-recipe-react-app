const db = require('../database/index.js');

class Recommendations {

  //________GET_________
  static getTrending(callback) {
    const query = 'CALL recommendTrending()';
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res[0]);
    });
  }

  static getLowCost(user_id, callback) {
    const query = 'CALL recommendLowCost('+user_id+')';
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res[0]);
    });
  }


  static getSimilarTags(user_id, callback) {
    const query = 'CALL recommend_by_tag('+user_id+')';
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res[0]);
    });
  }

  static getByFollow(user_id, callback) {
    const query = 'CALL people_you_follow_also_like('+user_id+')';
    db._query(query, (err, res) => {
      if(err.error)
        return callback(err);
      callback(res[0]);
    });
  }


  //________POST_________


  //________DELETE_________



}

module.exports = Recommendations;
