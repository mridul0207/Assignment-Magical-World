const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }
  res.cookie("token", token, options).status(200).json({
    success: true,
    token,
    user,
    message: `User Login Success`,
  });
});

module.exports = router;
