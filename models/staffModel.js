import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true,
        trim:true
    },
    address:{
        type:String,
        require:true,
    },
    streetaddress:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true,
    },
    country: {
        type:String,
        require:true,
    },
    postal:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true,
    },
    expertin:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default:'2'
    },
    active: {
        type: Boolean,
        default: true,
        active: true,
      }

},{timestamps:true})

export default mongoose.model('staff',staffSchema)