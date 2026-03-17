import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items:{
      type: [Schema.Types.ObjectId],
      ref: "Item",
      default: [],
    },
    userEmail: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

const Category = mongoose.models.Category || model("Category", categorySchema);

export default Category;
