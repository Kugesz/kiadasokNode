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
    budget: {
      type: Number,
      default: 100000,
    },
    spending: {
      type: Number,
      default: 0,
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

//Calculate spending everytime it is updated
userSchema.pre("save", function (next) {
  console.log("middle");
  console.log(
    this.expenses.reduce((total, expense) => total + expense.amount, 0)
  );
  this.spending = this.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  next();
});

export default mongoose.model("User", userSchema);
