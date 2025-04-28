const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobPosting = sequelize.define('JobPosting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('requirements');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('requirements', JSON.stringify(value));
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
    allowNull: false
  },
  experienceLevel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'closed', 'draft'),
    defaultValue: 'active'
  },
  applicationDeadline: {
    type: DataTypes.DATE,
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
  }
}, {
  timestamps: true
});

module.exports = JobPosting;