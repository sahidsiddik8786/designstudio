import mongoose from "mongoose";

const designimgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
      },
    
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category-design', 
      required: true
    },
    
  },
);

export default mongoose.model("Designimg", designimgSchema); 

