const mysql = require('mysql');

const SSL = process.env.NODE_ENV === 'production';
const config = {
  host: '127.0.0.1',
  user: 'hollyc',
  password: 'JaZgAkV2NYP',
  database: 'recipedb',
  ssl: SSL,
  debug: false
};


class Database {
  constructor () {
    this.pool = mysql.createPool(config);

    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle mySQL client.', err);
      process.exit(-1);
    });
  }

  _query (query, ...args) {
    this.pool.getConnection(function(err, connection) {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];
      // console.log("Got pool connection")

      connection.query(query, function(err, results, fields) {
          if (err) {
            console.log(err.stack);
            return callback({ error: 'Database error.' }, null);
          }
          callback({}, results);
          connection.release();
          // handle error after release
          if (err) throw err;
          });
    });
  }

  end () {
    // close all connections
    this.pool.end(function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
  }

}

module.exports = new Database();
