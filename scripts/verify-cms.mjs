import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not configured");
}

await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB || "presmile",
});

const db = mongoose.connection.db;
const services = await db.collection("services")
  .find({}, { projection: { _id: 0, slug: 1, title: 1, order: 1 } })
  .sort({ order: 1 })
  .toArray();
const videos = await db.collection("videos")
  .find({}, { projection: { _id: 0, title: 1, placement: 1, published: 1 } })
  .toArray();
const posts = await db.collection("posts")
  .find({ published: true }, { projection: { _id: 0, slug: 1, title: 1 } })
  .sort({ publishedAt: -1 })
  .toArray();
const settings = await db.collection("settings").findOne({}, {
  projection: {
    _id: 0,
    "contact.tiktok": 1,
    "contact.tiktokDoctor": 1,
    "contact.youtube": 1,
  },
});

console.log(JSON.stringify({
  services,
  posts,
  videos,
  socialConfigured: {
    tiktok: Boolean(settings?.contact?.tiktok),
    tiktokDoctor: Boolean(settings?.contact?.tiktokDoctor),
    youtube: Boolean(settings?.contact?.youtube),
  },
}, null, 2));

await mongoose.disconnect();
