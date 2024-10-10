const { Schema, model } = require("mongoose");

const questionSchema=new Schema({
    questionText :{
        type:String,
        required:true
    },
    choice :[{
        type:String,
        required:true
    }],
    correctAnswer:{
        type:String,
        required:true
    }
})

const QuizSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    questions:[questionSchema],
},{timestamps:true})
const Quiz=model("Quiz",QuizSchema)
module.exports=Quiz;