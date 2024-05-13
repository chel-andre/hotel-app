import mongoose from 'mongoose';
import { testConfig } from '../testConfig';

export function connectToDb () {
    return mongoose.connect(testConfig.mongooseConnectionString);
}

export function disconnectFromDb() {
    return mongoose.disconnect();
}
