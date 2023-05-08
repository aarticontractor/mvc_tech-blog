const express = require('express');
const routes = require('./controllers');
// const sequelize = require('sequelize');
const { User, Blogpost, Comment } = require('./models');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(routes);

const syncDb = async () => {
    console.log("Hello")
  await sequelize.sync({
    force: true
  });

};

syncDb();

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});