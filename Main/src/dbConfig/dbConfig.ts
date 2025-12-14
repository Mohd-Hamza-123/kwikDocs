// lib/mongoose.ts
import mongoose from "mongoose";
import conf from "@/conf/conf";

declare global {
  // eslint-disable-next-line no-var
  var __mongoose__: {
    conn?: typeof mongoose | null;
    promise?: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGO_URI = conf.mongodb_uri;

if (!global.__mongoose__) {
  global.__mongoose__ = { conn: null, promise: null };
}

async function connectDB() {
  if (global.__mongoose__!.conn) {
    return global.__mongoose__!.conn;
  }

  if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
  }

  if (!global.__mongoose__!.promise) {
    global.__mongoose__!.promise = mongoose
      .connect(MONGO_URI)
      .then((mongooseInstance) => {
        global.__mongoose__!.conn = mongooseInstance;
        return mongooseInstance;
      })
      .catch((err) => {
        global.__mongoose__!.promise = null;
        throw err;
      });
  }

  return global.__mongoose__!.promise!;
}

export default connectDB;
