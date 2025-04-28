const User = require('./User');
const Company = require('./Company');
const Candidate = require('./Candidate');
const JobPosting = require('./JobPosting');
const Interview = require('./Interview');
const Question = require('./Question');
const Response = require('./Response');

// User associations
User.hasOne(Company, { foreignKey: 'userId', as: 'company' });
User.hasOne(Candidate, { foreignKey: 'userId', as: 'candidate' });

// Company associations
Company.belongsTo(User, { foreignKey: 'userId' });
Company.hasMany(JobPosting, { foreignKey: 'companyId' });

// Candidate associations
Candidate.belongsTo(User, { foreignKey: 'userId' });
Candidate.hasMany(Interview, { foreignKey: 'candidateId' });
Candidate.hasMany(Response, { foreignKey: 'candidateId' });

// JobPosting associations
JobPosting.belongsTo(Company, { foreignKey: 'companyId' });
JobPosting.hasMany(Interview, { foreignKey: 'jobPostingId' });

// Interview associations
Interview.belongsTo(Candidate, { foreignKey: 'candidateId' });
Interview.belongsTo(JobPosting, { foreignKey: 'jobPostingId' });
Interview.hasMany(Response, { foreignKey: 'interviewId' });

// Question associations
Question.hasMany(Response, { foreignKey: 'questionId' });

// Response associations
Response.belongsTo(Interview, { foreignKey: 'interviewId' });
Response.belongsTo(Question, { foreignKey: 'questionId' });
Response.belongsTo(Candidate, { foreignKey: 'candidateId' });

module.exports = {
  User,
  Company,
  Candidate,
  JobPosting,
  Interview,
  Question,
  Response
};