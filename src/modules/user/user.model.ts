import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    restrauntName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firebaseUid: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "owner"],
      default: "owner",
    },
    photoURL: { type: String, default: "" },
    itemImageEnabled: { type: Boolean, default: true },
    accessCodes: [
      {
        code: { type: String },
        validity: { type: Date },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models.User || model("User", userSchema);

export default User;
