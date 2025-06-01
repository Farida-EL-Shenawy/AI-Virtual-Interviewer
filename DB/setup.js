// setup.js
// MongoDB shell script to create collections with validation

// Switch to your database
use('AcuHire');

// 1. Users
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'passwordHash', 'role', 'name', 'createdAt', 'updatedAt'],
      properties: {
        email:        { bsonType: 'string', description: 'must be a string and is required' },
        passwordHash: { bsonType: 'string', description: 'must be a string and is required' },
        role:         { enum: ['company', 'candidate', 'admin'], description: 'must be one of the allowed roles' },
        name:         { bsonType: 'string', description: 'must be a string and is required' },
        companyProfile: {
          bsonType: 'object',
          description: 'company details for role=company',
          properties: {
            companyName: { bsonType: 'string' },
            website:     { bsonType: 'string' },
            address:     { bsonType: 'string' }
          }
        },
        candidateProfile: {
          bsonType: 'object',
          description: 'candidate details for role=candidate',
          properties: {
            resumePath:     { bsonType: 'string' },
            phone:          { bsonType: 'string' },
            socialLinks:    {
              bsonType: 'object',
              properties: {
                linkedin:  { bsonType: 'string' },
                github:    { bsonType: 'string' },
                portfolio: { bsonType: 'string' }
              }
            },
            education: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['institution', 'degree', 'startDate', 'endDate'],
                properties: {
                  institution: { bsonType: 'string' },
                  degree:      { bsonType: 'string' },
                  startDate:   { bsonType: 'date' },
                  endDate:     { bsonType: 'date' }
                }
              }
            },
            certifications: { bsonType: 'array', items: { bsonType: 'string' } }
          }
        },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
        lastLogin: { bsonType: 'date' }
      }
    }
  }
});

// 2. Job Posts
db.createCollection('jobposts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['companyId', 'title', 'description', 'status', 'createdAt', 'updatedAt'],
      properties: {
        companyId:      { bsonType: 'objectId' },
        title:          { bsonType: 'string' },
        description:    { bsonType: 'string' },
        location:       { bsonType: 'string' },
        employmentType: { enum: ['full_time','part_time','contract','internship'] },
        remoteOption:   { bsonType: 'bool' },
        salaryRange: {
          bsonType: 'object',
          properties: {
            min:      { bsonType: 'double' },
            max:      { bsonType: 'double' },
            currency: { bsonType: 'string' }
          }
        },
        requirements:    { bsonType: 'array', items: { bsonType: 'string' } },
        preferredTraits: { bsonType: 'array', items: { bsonType: 'string' } },
        tags:            { bsonType: 'array', items: { bsonType: 'string' } },
        interviewLink:   { bsonType: 'string' },
        passcode:        { bsonType: 'string' },
        status:          { enum: ['active','closed'] },
        createdAt:       { bsonType: 'date' },
        updatedAt:       { bsonType: 'date' }
      }
    }
  }
});

// 3. Interview Sessions
db.createCollection('interviewSessions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['candidateId','jobPostId','passcode','sessionStatus'],
      properties: {
        candidateId:   { bsonType: 'objectId' },
        jobPostId:     { bsonType: 'objectId' },
        passcode:      { bsonType: 'string' },
        sessionStatus: { enum: ['scheduled','in_progress','completed','cancelled'] },
        scheduledAt:   { bsonType: 'date' },
        startedAt:     { bsonType: 'date' },
        endedAt:       { bsonType: 'date' },
        meetingLink:   { bsonType: 'string' },
        videoPath:     { bsonType: 'string' },
        audioPath:     { bsonType: 'string' },
        createdAt:     { bsonType: 'date' },
        updatedAt:     { bsonType: 'date' }
      }
    }
  }
});

// 4. Questions
db.createCollection('questions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['sessionId','questionText','questionType','source','order'],
      properties: {
        sessionId:    { bsonType: 'objectId' },
        questionText: { bsonType: 'string' },
        questionType: { enum: ['technical','behavioral','custom'] },
        source:       { enum: ['ai','manual'] },
        modelUsed:    { bsonType: 'string' },
        order:        { bsonType: 'int' }
      }
    }
  }
});

// 5. Responses
db.createCollection('responses', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['questionId','sessionId','candidateId','timestamp'],
      properties: {
        questionId:       { bsonType: 'objectId' },
        sessionId:        { bsonType: 'objectId' },
        candidateId:      { bsonType: 'objectId' },
        responseText:     { bsonType: 'string' },
        responseAudioPath:{ bsonType: 'string' },
        responseVideoPath:{ bsonType: 'string' },
        timestamp:        { bsonType: 'date' },
        durationSec:      { bsonType: 'double' }
      }
    }
  }
});

// 6. Analysis
db.createCollection('analysis', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['responseId','analyzedAt'],
      properties: {
        responseId:       { bsonType: 'objectId' },
        questionId:       { bsonType: 'objectId' },
        sessionId:        { bsonType: 'objectId' },
        nlpScore:         { bsonType: 'double' },
        technicalAccuracy:{ bsonType: 'double' },
        speechEmotion:    { bsonType: 'object' },
        facialEmotion:    { bsonType: 'object' },
        summaryText:      { bsonType: 'string' },
        analyzedAt:       { bsonType: 'date' }
      }
    }
  }
});

// 7. Feedback
db.createCollection("feedback", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["sessionId", "finalScore", "createdAt"],
      properties: {
        sessionId: {
          bsonType: "objectId"
        },
        candidateId: {
          bsonType: "objectId"
        },
        jobPostId: {
          bsonType: "objectId"
        },
        interviewerId: {
          bsonType: "objectId"
        },
        finalScore: {
          bsonType: "double"
        },
        strengths: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },
        weaknesses: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },
        recommendations: {
          bsonType: "string"
        },
        createdAt: {
          bsonType: "date"
        }
      }
    }
  }
});


// 8. Logs
db.createCollection('logs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['actionType','timestamp'],
      properties: {
        userId:     { bsonType: 'objectId' },
        actionType: { bsonType: 'string' },
        timestamp:  { bsonType: 'date' },
        ipAddress:  { bsonType: 'string' },
        userAgent:  { bsonType: 'string' },
        details:    { bsonType: 'object' },
        metadata:   { bsonType: 'object' }
      }
    }
  }
});

print('✅ All collections created with schema validation.');
