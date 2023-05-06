// Import the models
const User = require('./models/User');
const Blogpost = require('./models/Blogpost');
const Comment = require('./models/Comment');

// Defined the associations between the models

// A user can create many posts, 
// so the User model has a one-to-many association with the Blogpost model
User.hasMany(Blogpost, {
  foreignKey: 'user_id'
});

// A Blogpost can only belong to one user,
// so the Blogpost Model has a many to one association with the User Model.
Blogpost.belongsTo(User, {
  foreignKey: 'user_id'
});

// A user can make many comments,
// So the User model has a one to many associations with the Comment Model.
User.hasMany(Comment, {
  foreignKey: 'user_id'
});

// A comment can only be made by one user, 
// so the Comment model has a many-to-one association with the User model.
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});


// A Blogpost can have many comments, 
// so the Blogpost model has a one-to-many association with the Comment model.
Blogpost.hasMany(Comment, {
  foreignKey: 'blogpost_id'
});


// A comment can only be made on one blogpost, 
// so the Comment model has a many-to-one association with the Blogpost model.
Comment.belongsTo(Blogpost, {
  foreignKey: 'blogpost_id'
});

// Export the models
module.exports = { User, Blogpost, Comment };








