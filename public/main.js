document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        // Redirect to the desired page or handle successful login
        console.log('Login successful');
        window.location.href = '/dashboard';
    } else {
        // Handle errors
        console.error('Login failed');
        alert('Incorrect Username or Password');
    }
});

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        // Redirect to the desired page or handle successful signup
        console.log('Signup successful');
        alert('Signup successful. Please login now.');
    } else {
        // Handle errors
        console.error('Signup failed');
        alert('Please add valid username and password');
    }
});