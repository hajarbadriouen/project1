require('dotenv').config(); // Load .env file
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');  // Add this line

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Use CORS middleware to allow requests from all origins
app.use(cors());

// Dummy user data (replace with real database in production)
const users = [
    { email: 'user@example.com', password: 'password123', role: 'student' },
    { email: 'teacher@example.com', password: 'teacher123', role: 'teacher' },
];

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user from dummy data (replace with real database check)
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Generate JWT token using secret from the .env file
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    // If user is not found or password is incorrect
    return res.status(401).json({ message: 'Invalid email or password' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
