const mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema.Types

// const LessonSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   resource_url: String
// })
//const Lesson = mongoose.model('Lesson', LessonSchema)
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    //Name or title of the course postes
  },
  image: {
    type: String,
    default: "no photo"
  },
  category: {
    type: String,
    required: true
  },
  updated: Date,
  postedBy: {
    type: ObjectId,
    ref: "User"
  }
  //,
  // instructor: {type: mongoose.Schema.ObjectId, ref: 'User'},
  // published: {
  //   type: Boolean,
  //   default: false
  // },
  // lessons: [LessonSchema]
})

//export default 
mongoose.model("course", courseSchema)