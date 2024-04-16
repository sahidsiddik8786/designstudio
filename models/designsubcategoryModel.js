import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  parentCategorydesign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category-design', // Reference to Category model
    required: true
  },
}, { timestamps: true });


export default mongoose.model('Subcategory-design', subcategorySchema);

