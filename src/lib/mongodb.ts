// src/lib/mongodb.js

import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    const mongoDBuri = process.env.NEXT_PUBLIC_MONGODB_URI;

    if (!mongoDBuri) {
        throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env.local');
    }

    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(mongoDBuri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
