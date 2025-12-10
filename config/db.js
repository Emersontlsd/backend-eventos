import mongoose from "mongoose";
import { ENV } from "./env.js";

const MONGO_URI = ENV.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI não definido no env.js");
}

let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
      console.log("🔥 MongoDB conectado");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
