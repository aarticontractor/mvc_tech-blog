const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const { User, Blogpost, Comment } = require('./models');
const sequelize = require('./config/connection');
const fetch = require('node-fetch');

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

  app.get('/dashboard', async (req, res) => {
    try {
      const response = await fetch('http://localhost:3001/api/blogpost/all');
      const blogposts = await response.json();
      console.log(blogposts);

      // Fetch comments for each blogpost
    const blogpostsWithComments = await Promise.all(
      blogposts.map(async (blogpost) => {
        const commentsResponse = await fetch(`http://localhost:3001/api/comment/all/${blogpost.id}`);
        const comments = await commentsResponse.json();
        return { ...blogpost, comments };
      })
    );

    console.log(blogpostsWithComments);

    res.render('dashboard', { title: 'All Blogs', username: null, blogposts: blogpostsWithComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch blog posts.' });
  }
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