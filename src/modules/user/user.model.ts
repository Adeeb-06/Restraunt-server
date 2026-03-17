import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firebaseUid: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "owner"],
      default: "owner",
    },
    photoURL: { type: String, default: "" },
  },
  { timestamps: true },
);

const User = mongoose.models.User || model("User", userSchema);

export default User;
