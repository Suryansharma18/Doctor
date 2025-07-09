
const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    // Validate required fields
    const { name, email, password, role, contactNumber } = req.body;
    
    if (!name || !email || !password || !role || !contactNumber) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, password, role, and contactNumber'
      });
    }

    const user = await authService.register(req.body);
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        role: user.role,
        contactNumber: user.contactNumber // Include contact number in response
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        contactNumber: user.contactNumber // Include contact number in response
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };