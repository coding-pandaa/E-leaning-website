const express =  require('express');
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')
//Msxty36dZZPWGex6

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeah")
})
mongoose.connection.on('error',()=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/course')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/course'))



app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})