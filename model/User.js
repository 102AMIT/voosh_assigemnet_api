const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    order:{
        type:String,
        default:""
    }

},{timestamps:true}
);

const user=mongoose.model('User',UserSchema);

module.exports=user;