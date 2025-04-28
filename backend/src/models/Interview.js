const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Interview = sequelize.define('Interview', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  candidateId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Candidates',
      key: 'id'
    }
  },
  jobPostingId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'JobPostings',
      key: 'id'
    }
  },
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // Duration in minutes
    allowNull: false,
    defaultValue: 30
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Interview;