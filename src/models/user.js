const { error, timeStamp } = require('console');
const mongoose=require('mongoose');
const { type } = require('os');
const util = require('util');
const validater=require('validator');





const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:12,
    },
    lastName:{
        type:String,
        default:"lastname",
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validater.isEmail(value))
                {
                throw Error("Validation failed")
            }
        }


    },
    password:{
        type:String,
        minLength:8,
        required:true,
        

    },
    gender:{
        type:String,
        validate(value){
            if(!['M','F'].includes(value)){
                throw error;
            }
        }
    },
    age:{
        type:Number,

    }
    
},
{
    timestamps:true,
})

const User= mongoose.model('User',userSchema);



module.exports=User;