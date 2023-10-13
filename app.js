const express = require('express');

const {sequelize} = require('./db');
const {Sauce} = require('./models');

const seed = require('./seed')

const PORT = process.env.PORT || 3000;

const app = express();

//Allow CORS requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// serve static assets from the public/ folder
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
})