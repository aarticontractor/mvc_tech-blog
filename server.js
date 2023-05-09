const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const { User, Blogpost, Comment } = require('./models');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('homepage', { title: 'Home', username: null });
  });

  app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'All Blogs', username: null });
  });

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