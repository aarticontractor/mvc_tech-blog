const router = require('express').Router();
const {
  Blogpost, User
} = require('../../models');

router.post('/new', async (req, res) => {
  const {
    user_id,
    title,
    content
  } = req.body;
  const blogpost = await Blogpost.create({
    user_id,
    title,
    content,
    date_created: new Date(),
  });
  res.status(201).json(blogpost);
});



router.get('/all', async (req, res) => {
  // const blogposts = await Blogpost.findAll();
  // res.json(blogposts);

  const blogposts = await Blogpost.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });

  res.json(blogposts);
});



module.exports = router;




















module.exports = router;