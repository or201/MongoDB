import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  pages: Number,
  date: Date(),
  author: mongoose.Schema.Types.ObjectId,
});
