const express = require("express");

const router = express.Router();

const Quiz = require("../models/Quiz");

router.post("/", async(req,res)=>{
    try{
        if(!req.body.title || !req.body.questions || req.body.questions.length===0){
            return res.status(400).json({message:"Quiz title and questions required"});
        }
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    }
    catch(error){
        console.log("QUIZ SAVE ERROR:", error);
        res.status(500).json({message:error.message});
    }
});

router.get("/", async(req,res)=>{
    try{
        const quizzes = await Quiz.find();
        res.json(quizzes);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

router.get("/:id",
    async(req,res)=>{
        try{
            const quiz = await Quiz.findById(req.params.id);
            res.json(quiz);
        }
        catch(error){
            res.status(500).json({message:error.message});
        }
    }
);

router.delete("/:id", async(req, res)=>{
    try{
        await Quiz.findByIdAndDelete(req.params.id);
        res.json({message:" Quiz Deleted"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

router.put("/:id", async(req, res)=>{
    try{
        if(req.body.title && req.body.title.trim()===""){
            return res.status(400).json({message:"Title cannot be empty"});
        }
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.json(quiz);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

module.exports = router;