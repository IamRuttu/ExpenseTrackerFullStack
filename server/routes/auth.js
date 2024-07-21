var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
  let userData=req.body;
  User.findOne({email:userData.email})
  .then((user)=>{
    if(user){
        res.json({message: "User Login Successful",status:"success", data: user})
    }
    else{
        res.send({message: "User not registered", status:"failed",data:null})
    }
  })
  .catch(err=>{
    res.send({message: "INTERNAL_SERVER_ERROR",status:"failed",data:err})
  })
  
});

router.post('/signup', function(req, res, next) {
    let userData=req.body;
    User.findOne({email: userData.email})
    .then((user)=>{
        if(!user){
            let newUser=new User(userData);
            newUser.save()
            .then((result)=>{
                res.json({message: "User registered successfully", user: result})
            })
           .catch((err)=>{
               console.log(err);
           })
           res.send({message: "User registered successfully",status:"success",data:newUser});
        }

        else{
            res.send({message: "User already registered",status:"failed",data:null})
        }

    })
    .catch((err)=>{
        res.send({message: "INTERNAL_SERVER_ERROR",status:"failed",data:err})

    })
});

  
router.post('/', function(req, res, next) {
res.send('Hello from auth');

});
  

module.exports = router;
