import mongoose from "mongoose";
const authorSchema = new mongoose.Schema({
  fistName: String,
  lastName: String,
  Birth: Number,
});

export default authorSchema