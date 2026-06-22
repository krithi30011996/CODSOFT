const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    user:{
        type:String
    },
    quizId:{
        type:String
    },
    quizTitle:{
        type:String
    },
    score:{
        type:Number
    },
    total:{
        type:Number
    }
});

module.exports = mongoose.model("Result", resultSchema);