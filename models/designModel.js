import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
      },
    layout: {
      type: String, 
      required: true,
    },
    roomDimension: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category-design', // Reference to Category model
      required: true
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory-design', // Reference to Subcategory model
      required: true
    },
  },
);

export default mongoose.model("Design", designSchema); 

