const db = require('../models');
const User = db.User;

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Assign 'admin' if sent; fallback to 'user'
    const assignedRole = role === 'admin' ? 'admin' : 'user';

    const newUser = await db.User.create({
      username,
      email,
      password,
      role: assignedRole
    });

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser || existingUser.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Return role too
    res.status(200).json({
      message: 'Login successful',
      user: {
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

