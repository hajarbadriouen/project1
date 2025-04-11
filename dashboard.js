// Check if the user is logged in by looking for the token in localStorage
const token = localStorage.getItem('authToken');

if (!token) {
    // If no token, redirect to login page
    window.location.href = '/login.html';
}

// Decode the token to get user info
const userInfo = jwt_decode(token);

// Inject user info into the page
document.getElementById('userInfo').innerHTML = `
    <p>Email: ${userInfo.email}</p>
    <p>Role: ${userInfo.role}</p>
`;

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    // Remove token from localStorage and redirect to login page
    localStorage.removeItem('authToken');
    window.location.href = '/login.html';
});
