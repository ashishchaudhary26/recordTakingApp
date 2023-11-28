
const express=require("express");
// const app= express();

const mongoose = require('mongoose');


const User=require("../models/usermodels");
// app.use(express.json());

const router= express.Router();

router.post("/", async (req,res)=>{
    const {name ,email,age,detail}=req.body;
    try{
        const userAdded = await User.create({
            name:name,
            email:email,
            age:age,
            detail:detail,
        });
        res.status(201).json(userAdded);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error : error.message});
    }
});

router.get("/",async(req,res)=>{
    try{
        const showAll=await User.find();
        res.status(200).json(showAll);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error :error.message});
    }

});
//GET SINGLE USER
router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    try{
        const singleUser=await User.findById({_id:id});
        res.status(200).json(singleUser);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

//DELETE
router.delete("/delete/:id",async(req,res)=>{
    const{id}=req.params;
    try{
        const deletedUser =await User.findByIdAndDelete({_id:id});
        res.status(201).json(deletedUser);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

//UPDATE
router.patch("/edit/:id",async(req,res)=>{
    const{id}=req.params;
    const {name,email,age,detail}=req.body;
    try{
        const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true,});
        res.status(200).json(updatedUser);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});
module.exports=router;