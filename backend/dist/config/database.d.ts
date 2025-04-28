import { ConnectionOptions } from 'mongoose';
import winston from 'winston';
interface DatabaseConfig {
    mongoUri: string;
    options: ConnectionOptions;
}
export declare const dbConfig: DatabaseConfig;
export declare const connectDatabase: () => Promise<void>;
export declare const migrationConfig: {
    migrationsPath: string;
    dbName: string;
    migrationCollection: string;
    logger: winston.Logger;
};
export {};
