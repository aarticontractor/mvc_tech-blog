const router = require('express').Router();
const {Comment} = require('../../models');


router.post('/new', async (req, res) => {
  try {
    const { user_id, blogpost_id, content } = req.body;
    const date_created = new Date();

    const newComment = await Comment.create({ user_id, blogpost_id, content, date_created });

    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});


router.get('/all/:blogpostId', async (req, res) => {
  try {
    const { blogpostId } = req.params;

    const comments = await Comment.findAll({
      where: { blogpost_id: blogpostId }
    });

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});

module.exports = router;