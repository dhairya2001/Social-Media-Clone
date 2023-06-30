const userModel=require('../models/userModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const SECERET_KEY='SOCIALMEDIAAPI';

const signUp = async(req,res) =>{
    const{username,email,password}=req.body;
    try{
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:"User Already Exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        
        const result=await userModel.create({
            username:username,
            email:email,
            password:hashedPassword
        });
        const token = jwt.sign({email:email,id:result._id},SECERET_KEY);
        res.status(201).json({user:result,token:token});
    }catch(error){
        console.log(error);
        // res.status(500).json({message:"something went wrong"});
    }
}

const logIn=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const existingUser = await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({message:"User Not Found"});
        }
        const matchPassword=await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credential"});
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},SECERET_KEY);
        res.status(200).json({user:existingUser,token:token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

const resetPassword=async(req,res)=>{

}


module.exports={signUp,logIn,resetPassword};