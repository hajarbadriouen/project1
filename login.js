const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Response data:', data);  // Log the server response for debugging

        if (response.status === 200) {
            // On successful login, store JWT token in localStorage and redirect
            localStorage.setItem('authToken', data.token);
            window.location.href = '/dashboard.html'; // Redirect to the dashboard page
        } else {
            // Show error message if login failed
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});
