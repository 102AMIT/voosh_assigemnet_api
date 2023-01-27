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
    order:[ 
        {  
            id :{
                type :String,
                required:true,
                unique:true,
            },
            item_name:{
                type :String,
                required:true,
            },
            sub_total:{
                type:Number,
                required:true,
            },
            number :{
                type:Number,
                required:true,
            }
            
        }
    
    ]
        
    

},{timestamps:true}
);

const user=mongoose.model('User',UserSchema);

module.exports=user;