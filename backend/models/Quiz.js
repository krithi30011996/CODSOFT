const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:"General"
    },
    questions:[{
        question:{
            type:String,
            required:true
        },
        options:{
            type:[String],
            required:true
        },
        correct:{
            type:String,
            required:true
        }
    }]
});

module.exports = mongoose.model("Quiz", quizSchema);