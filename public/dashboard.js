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