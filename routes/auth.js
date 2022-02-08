const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const User=mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}= require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.post('/signup',(req,res)=>{
    const {name,email,password,role,gender} = req.body
    if(!email || !password || !name || !role || !gender)
    {
       return res.status(422).json({error: "Please add the fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error: "User already exists!"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user= new User({
                email,
                password: hashedpassword,
                name,
                role,
                gender
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })

        })
        
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password,role}= req.body
    if(!email || !password || !role)
    {
        return res.status(422).json({error: "Please provide email,password and role"})
    }
    User.findOne({email: email,role: role})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email,password or role"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                //res.json({message: "Sucessfully signed in"})
                const token = jwt.sign({_id: savedUser._id},JWT_SECRET)
                const{_id,email,password,role} = savedUser
                res.json({token,user:{_id,email,password,role}})
            }
            else{
                return res.status(422).json({error: "Invalid Email,password or role"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
})


module.exports = router