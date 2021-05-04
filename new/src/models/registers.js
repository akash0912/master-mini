const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    firstName:{
        type:String,require:true
    },
    lastName:{
        type:String,require:true
    },
    email:{
        type:String,require:true,unique:true
    },
    password:{
        type:String,require:true
    },
    confirmPassword:{
        type:String,require:true
    },
})

const Register = new mongoose.model("Regster",gameSchema);
module.exports = Register;