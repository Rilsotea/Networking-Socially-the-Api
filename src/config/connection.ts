import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/networkingsocially';

mongoose.connect(connectionString, {
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

export default mongoose.connection;