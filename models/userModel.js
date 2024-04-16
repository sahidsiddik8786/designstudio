import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

    role:{
        type:String,
        default:'0'
    },
    active: {
        type: Boolean,
        default: true,
        active: true,// Set to true by default, meaning the user is active
      }

},{timestamps:true})

export default mongoose.model('users',userSchema)