const validate=require('validator');

const validateSignUpData= (req)=>{
    const {firstName, lastName , password, email}=req.body;
    if(!firstName || !lastName){
        throw Error("Please enter the first name and lastname");
    }
    if(!validate.isStrongPassword(password)){
        throw Error("Please enter a strong Password");

    }
    if(!validate.isEmail(email)){
        throw Error("Please enter valid Email");
    }
}

module.exports={validateSignUpData};