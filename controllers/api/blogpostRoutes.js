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
    order: [['id', 'DESC']],
  });

  res.json(blogposts);
});

router.get('/all/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const comments = await Blogpost.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['id', 'DESC']],
    });

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve Blogs for user' });
  }
});


module.exports = router;




















module.exports = router;