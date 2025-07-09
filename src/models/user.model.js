const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.ENUM('doctor', 'frontend'),
      allowNull: false,
      defaultValue: 'frontend',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ✅ Added contact number field (minimal changes only)
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // Optional: Add phone number format validation
        is: {
          args: [/^[+]?(\d{1,3})?[(]?\d{3}[)]?[-]?\d{3}[-]?\d{4,9}$/i],
          msg: 'Please enter a valid phone number'
        }
      }
    }
  });

  return User;
};