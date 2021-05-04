const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/gameData",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
} ).then(()=>{
    console.log("Successful Connection");
}).catch((e)=>{
    console.log(e);  
})