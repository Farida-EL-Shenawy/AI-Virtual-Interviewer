const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Candidate = sequelize.define('Candidate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('skills');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('skills', JSON.stringify(value));
    }
  },
  education: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resumePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkedinUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  availability: {
    type: DataTypes.ENUM('immediately', 'two_weeks', 'one_month', 'other'),
    allowNull: true
  },
  preferredLocation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Candidate;