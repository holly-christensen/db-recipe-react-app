//$npm run server  (run with nodemon script in package.json to keep server running during development)
//or manually:  $ node server/index.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
//const app = express().use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

//interact with the express middleware
app.use('/api/users', require('./api/users'));
app.use('/api/recipes', require('./api/recipes'));
app.use('/api/ingredients', require('./api/ingredients'));



// if (ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
// }

//when a request is made to the server on this port, express will send a response
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



// db.query('SELECT NOW()', (err, res) => {
//   if (err.error)
//     return console.log(err.error);
//   console.log(`mySQL connected: ${res[0].now}.`);
// });


module.exports = app;
