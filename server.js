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
    try {
      await sequelize.authenticate();
      const tableNames = await sequelize.showAllSchemas();
      if (tableNames.length === 0) {
        await sequelize.sync();
        console.log('Database synchronized');
      }
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  };

// Start the server after the database is synced
syncDb().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });