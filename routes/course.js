const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin =  require('../middleware/requireLogin')
const course = mongoose.model("course")


router.get('/allcourses',(req,res)=>{
    course.find()
    .populate("postedBy","_id name role")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createcourse',requireLogin,(req,res)=>{
    const {name,category}=req.body
    if(!name || !category) {
        res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    const post = new course({
        name,
        category,
        postedBy : req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mycourses/:id',requireLogin,async(req,res)=>{
    var id = req.params.id
    // course.find({postedBy:id})
    // .populate("postedBy","_id name")
    // .then(mycourses=>{
    //     res.json({mycourses})
    // })
    try{
        var c = await course.find({postedBy: id});
        res.send(c)
    }catch(e){
        console.log(e)
    }

    // .catch(err=>{
    //     console.log(err)
    // })
})


module.exports = router