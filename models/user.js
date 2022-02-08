const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: 
    { 
    type: String,
    // unique: 'Email already exists',
    // match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: true
    },
    password: 
    { 
        type: String, 
        required: true 
    },
    role: 
    { 
        type: String, 
        required: true 
    },
    gender: 
    { 
        type: String, 
        required: true 
    },
    profilePic: { 
        type: String },
});

//module.exports = 
mongoose.model("User", userSchema);