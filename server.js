const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const { User, Blogpost, Comment } = require('./models');
const sequelize = require('./config/connection');
const fetch = require('node-fetch');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up the session store
const sessionStore = new SequelizeStore({
  db: sequelize,
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Configure the session middleware
app.use(
  session({
    secret: 'your-session-secret', 
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Register the formatDate helper function
const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

app.engine('handlebars', exphbs({
  helpers: {
    formatDate,
  },
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {

  if (req.session.user) {
    return res.redirect('/home'); // Redirect to the login page if the user is not logged in
  }

    res.render('homepage', { title: 'Home', username: null });
  });

  app.get('/home', async (req, res) => {
    const apiServerUrl = process.env.API_SERVER_URL || 'http://localhost:3001';
    if (!req.session.user) {
      return res.redirect('/'); // Redirect to the login page if the user is not logged in
    }
    try {
      const response = await fetch(`${apiServerUrl}/api/blogpost/all`);
      const blogposts = await response.json();
      console.log(blogposts);

      // Fetch comments for each blogpost
    const blogpostsWithComments = await Promise.all(
      blogposts.map(async (blogpost) => {
        const commentsResponse = await fetch(`${apiServerUrl}/api/comment/all/${blogpost.id}`);
        const comments = await commentsResponse.json();
        return { ...blogpost, comments };
      })
    );

    console.log(blogpostsWithComments);

    res.render('home', { title: 'All Blogs', user_id: req.session.user.id, username: req.session.user.username, blogposts: blogpostsWithComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch blog posts.' });
  }
  });

  app.get('/dashboard', async (req, res) => {
    const apiServerUrl = process.env.API_SERVER_URL || 'http://localhost:3001';
    if (!req.session.user) {
      return res.redirect('/'); // Redirect to the login page if the user is not logged in
    }
    try {
      const user_id = req.session.user.id;
      console.log(user_id)
      const response = await fetch(`${apiServerUrl}/api/blogpost/all/${user_id}`);
      const blogposts = await response.json();
      console.log(blogposts);

      // Fetch comments for each blogpost
    const blogpostsWithComments = await Promise.all(
      blogposts.map(async (blogpost) => {
        const commentsResponse = await fetch(`${apiServerUrl}/api/comment/all/${blogpost.id}`);
        const comments = await commentsResponse.json();
        return { ...blogpost, comments };
      })
    );

    console.log(blogpostsWithComments);

    res.render('dashboard', { title: 'My Blogs', user_id: req.session.user.id, username: req.session.user.username, blogposts: blogpostsWithComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch blog posts for user.' });
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
      await sessionStore.sync();
      console.log('Session store synchronized');
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