var express = require("express");
var app = express();
const path = require("path");
var exphbs  = require('express-handlebars');
var hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const { json } = require("body-parser");
var port = process.env.PORT ||3000;
app.set('port',port);


const static_path=path.join("public");

app.use(express.static(static_path));



app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set("view engine", ".hbs");
//app.use(express,json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
         res.render("index");
});

app.get("/register",(req,res)=>{
        res.render("register");
});

app.post("/register", async (req,res)=>{
   try{
      /* console.log(req.body.firstName);
      res.send(req.body.firstName); */

      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      if(password === confirmPassword){
        const registerPlayer = new Register({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            email : req.body.email,
            password : password,
            confirmPassword :confirmPassword
        })

        const registered = await registerPlayer.save();
        res.status(201).render("index");

      }else{
          res.send("Password are not matching");
      }
       } catch(error){
           res.status(400).send(error);
   }
});

app.get("/login",(req,res)=>{
    res.render("login");
});
//login check
app.post("/login",async (req,res)=>{
   try{
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({email:email});
   
    if(userEmail.password === password){
res.status(201).render("first-page");
    }else{
        res.send("password or email is incorrect");
    }
    

    // console.log(`email is ${email} and password is ${password}`);
   }catch(error){
       res.status(400).send(error);
   }
});

app.get("/game-page",(req,res)=>{
    res.render("game-page");
});
app.get("/rules",(req,res)=>{
    res.render("rules");
})
app.listen(port,()=>{
    console.log("Server is running at port no  "+ app.get('port'));
}); 
