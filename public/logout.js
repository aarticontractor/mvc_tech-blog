document.getElementById("logout-button").addEventListener("click", async () => {
    await fetch('/api/user/logout', { method: 'POST' }); // Clear the session on the server
    sessionStorage.clear(); // Clear the session on the client
    location.href = "/";
  });