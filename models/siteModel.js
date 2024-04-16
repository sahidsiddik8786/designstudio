import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
  description: { 
    type: String, 
    required: true 
  },
  
  images: [{ 
    data: Buffer,
    contentType: String,
  }],

  designSuggestions: [{ 
    data: Buffer,
    contentType: String,
  }],

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true  // Make createdBy field required
  }
});

export default mongoose.model('site', siteSchema);
