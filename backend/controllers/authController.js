const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({ _id: user._id, username: user.username });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// Login user
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ _id: user._id, username: user.username, token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = { register, login };
