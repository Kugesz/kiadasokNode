import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    expenses: [
      {
        description: String,
        amount: Number,
        date: { type: Date, default: Date.now },
        category: String,
      },
    ],
  },
  { collection: "users" }
);

export default mongoose.model("Author", userSchema);
