import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/networkingsocially';

// Connect to MongoDB
mongoose.connect(connectionString, {});

// Event listeners for connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to the database');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected from the database');
});

export default mongoose.connection;