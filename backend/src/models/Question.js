const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('technical', 'behavioral', 'situational', 'general'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  difficultyLevel: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    allowNull: false,
    defaultValue: 'intermediate'
  },
  expectedDuration: {
    type: DataTypes.INTEGER, // Duration in seconds
    allowNull: true
  },
  tags: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value));
    }
  },
  sampleAnswer: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rubric: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('rubric');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('rubric', JSON.stringify(value));
    }
  }
}, {
  timestamps: true
});

module.exports = Question;