document.getElementById("logout-button").addEventListener("click", async () => {
    await fetch('/api/user/logout', { method: 'POST' }); // Clear the session on the server
    sessionStorage.clear(); // Clear the session on the client
    location.href = "/";
  });

  document.getElementById("home").addEventListener("click", async () => {
    
    location.href = "/home";
  });

  document.getElementById("dashboard").addEventListener("click", async () => {
    
    location.href = "/dashboard";
  });