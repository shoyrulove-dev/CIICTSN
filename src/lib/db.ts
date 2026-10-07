import mongoose from "mongoose";

declare global {
  var presmileMongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose | null> | null } | undefined;
}

const cache = global.presmileMongoose ?? { conn: null, promise: null };
global.presmileMongoose = cache;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        dbName: process.env.MONGODB_DB || "ciic",
        maxPoolSize: 5,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 5_000,
        socketTimeoutMS: 10_000,
      })
      .catch((error) => {
        console.warn("MongoDB unavailable, using built-in CIIC content.", error);
        cache.promise = null;
        return null;
      });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
