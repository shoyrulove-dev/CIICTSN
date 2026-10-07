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
      .connect(uri, { dbName: process.env.MONGODB_DB || "presmile" })
      .catch((error) => {
        console.warn("MongoDB unavailable, using built-in Presmile content.", error);
        cache.promise = null;
        return null;
      });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
