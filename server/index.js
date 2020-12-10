
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

//interact with the express middleware
app.use('/api/users', require('./api/users'));
app.use('/api/recipes', require('./api/recipes'));
app.use('/api/ingredients', require('./api/ingredients'));
app.use('/api/appliances', require('./api/appliances'));
app.use('/api/utils', require('./api/utils'));
app.use('/api/recommendations', require('./api/recommendations'));
app.use('/api/tags', require('./api/tags'));



// if (ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
// }


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



module.exports = app;
