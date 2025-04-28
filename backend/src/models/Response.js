const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Response = sequelize.define('Response', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  interviewId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Interviews',
      key: 'id'
    }
  },
  questionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Questions',
      key: 'id'
    }
  },
  candidateId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Candidates',
      key: 'id'
    }
  },
  textResponse: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  audioPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER, // Duration in seconds
    allowNull: true
  },
  aiEvaluation: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('aiEvaluation');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('aiEvaluation', JSON.stringify(value));
    }
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  flags: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('flags');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('flags', JSON.stringify(value));
    }
  }
}, {
  timestamps: true
});

module.exports = Response;