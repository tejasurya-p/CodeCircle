const mongoose=require('mongoose');
const util = require('util');





const userSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    }
    
})

const User= mongoose.model('User',userSchema);

console.log(User.constructor.toString());
console.log(util.inspect(User.constructor, { showHidden: true, depth: 5, colors: true }));

module.exports=User;