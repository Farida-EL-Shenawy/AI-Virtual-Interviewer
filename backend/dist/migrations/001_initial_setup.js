"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = async (db) => {
    // Create collections with validators
    await db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['email', 'password', 'role', 'firstName', 'lastName'],
                properties: {
                    email: {
                        bsonType: 'string',
                        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                    },
                    password: {
                        bsonType: 'string',
                        minLength: 8
                    },
                    role: {
                        enum: ['candidate', 'company', 'admin']
                    },
                    firstName: {
                        bsonType: 'string',
                        minLength: 2
                    },
                    lastName: {
                        bsonType: 'string',
                        minLength: 2
                    },
                    company: {
                        bsonType: ['string', 'null']
                    },
                    position: {
                        bsonType: ['string', 'null']
                    },
                    profileComplete: {
                        bsonType: 'bool'
                    },
                    lastLogin: {
                        bsonType: 'date'
                    },
                    createdAt: {
                        bsonType: 'date'
                    },
                    updatedAt: {
                        bsonType: 'date'
                    }
                }
            }
        }
    });
    // Create indexes
    const users = db.collection('users');
    await Promise.all([
        // Single field indexes
        users.createIndex({ email: 1 }, { unique: true }),
        users.createIndex({ role: 1 }),
        users.createIndex({ createdAt: -1 }),
        users.createIndex({ lastLogin: -1 }),
        // Compound indexes
        users.createIndex({ company: 1, role: 1 }, { sparse: true }),
        users.createIndex({ firstName: 1, lastName: 1 }),
        // Text index for search
        users.createIndex({ firstName: 'text', lastName: 'text', company: 'text' }, { weights: { firstName: 2, lastName: 2, company: 1 } })
    ]);
};
exports.up = up;
const down = async (db) => {
    // Drop indexes
    const users = db.collection('users');
    await users.dropIndexes();
    // Drop collections
    await db.dropCollection('users');
};
exports.down = down;
//# sourceMappingURL=001_initial_setup.js.map