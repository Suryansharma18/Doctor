

// module.exports = { register, login };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

/**
 * Registers a new user with required fields including contact number.
 * @param {Object} userData - User registration data
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.role
 * @param {string} userData.contactNumber
 * @returns {Promise<Object>} - Registered user data
 */
const register = async ({ name, email, password, role, contactNumber }) => {
  // Validate required fields
  if (!name || !email || !password || !role || !contactNumber) {
    throw new Error('All fields (name, email, password, role, contactNumber) are required');
  }

  // Check for existing email
  const existingByEmail = await User.findOne({ where: { email } });
  if (existingByEmail) throw new Error('Email already registered');

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user with contact number
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    contactNumber
  });

  return user.toJSON();
};

/**
 * Authenticates a user and returns a JWT token.
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<{token: string, user: Object}>} - JWT token and user data
 */
const login = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  // Validate password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Invalid credentials');

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return { token, user: user.toJSON() };
};

module.exports = { register, login };