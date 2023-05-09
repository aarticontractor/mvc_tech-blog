document.getElementById('new-blogpost-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/api/blogpost/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: sessionStorage.getItem('user_id'),
            title,
            content,
        }),
    });

    if (response.ok) {
        alert('Blog post created successfully!');
        location.reload();
    } else {
        alert('Failed to create the blog post.');
    }
});


const commentForms = document.querySelectorAll('.comment-form');

commentForms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const comment = form.comment.value;
    const blogpostId = form.blogpost_id.value;

    const response = await fetch('/api/comment/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: sessionStorage.getItem('user_id'),
        blogpost_id: blogpostId,
        content: comment,
      }),
    });

    if (response.ok) {
      alert('Comment added successfully!');
      location.reload();
    } else {
      alert('Failed to add the comment.');
    }
  });
});
