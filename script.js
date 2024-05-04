document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const loginCard = document.getElementById('login-card');
    const signupCard = document.getElementById('signup-card');
    const homePage = document.getElementById('home-page');
  
    // Check if there are existing users in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    loginLink.addEventListener('click', function(event) {
      event.preventDefault();
      loginCard.style.display = 'block';
      signupCard.style.display = 'none';
      homePage.style.display = 'none';
    });
  
    signupLink.addEventListener('click', function(event) {
      event.preventDefault();
      signupCard.style.display = 'block';
      loginCard.style.display = 'none';
      homePage.style.display = 'none';
    });
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const user = users.find(u => u.email === email);
      if (user && user.password === password) {
        alert('Login successful');
        window.location.href = 'home.html'; // Redirect to home page
      } else if (user) {
        showNotification('Incorrect password', 'error');
      } else {
        showNotification('Account not found', 'error');
      }
    });
  
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('signup-username').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      // Check if email already exists
      if (users.some(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
      }
      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      showNotification('Signup successful', 'success');
      // You might want to automatically log in the user after signup
      // Or redirect to the login page
    });
  
    function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      const closeButton = document.createElement('button');
      closeButton.className = 'close-button';
      closeButton.textContent = '×';
      closeButton.addEventListener('click', function() {
        notification.remove();
      });
      notification.appendChild(closeButton);
      document.body.appendChild(notification);
      setTimeout(function() {
        notification.remove();
      }, 3000); // Remove notification after 3 seconds
    }
  });
