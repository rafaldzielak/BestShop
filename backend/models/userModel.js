import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 25 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
