const userModel=require('../models/userModel')
const bcrypt = require("bcrypt");

const updateUser=async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                // const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, 10);
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await userModel.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can update only your account!");
    }

}
const deleteUser=async(req,res)=>{
    const {userId,isAdmin}=req.body;
    if (userId === req.params.id || isAdmin) {
        try {
          await userModel.findByIdAndDelete(req.params.id);
          res.status(200).json("Account has been deleted");
        } catch (err) {
          return res.status(500).json(err);
        }
    } else {
    return res.status(403).json("You can delete only your account!");
    }
}
const getUser=async(req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;
    try {
        const user=userId? 
        await userModel.findById(userId):
        await userModel.findOne({username:username});
        const {password,updatedAt, ...other}=user._doc;
        res.status(201).json(other);
    } catch (error) {
        res.status(500).json(error)
    }
}
const followAUser=async(req,res)=>{
    
    if(req.body.userId!==req.params.id){
        try {
            const user=await userModel.findById(req.params.id);
            console.log(user)
            const currentUser=await userModel.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("User has been followed");
            }
            else{
                res.status(403).json("User Already followed")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("Cannot follow yourself");
    }
}
const unfollowAUser=async(req,res)=>{
    // const {userId}=req.body;
    // const {friendUserId}=req.params.id;
    if(req.body.userId!==req.params.id){
        try {
            const friend=await userModel.findById(req.params.id);
            const user=await userModel.findById(req.body.userId);
            if(friend.followers.includes(req.body.userId)){
                await friend.updateOne({$pull:{followers:req.body.userId}});
                await user.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("User has been unfollowed");
            }
            else{
                res.status(403).json("You don't follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You cannot unfollow yourself");
    }
}

const getFollowers=async(req,res)=>{
    try {
        const user=await userModel.findById(req.params.userid);
        const {password,updatedAt, ...other}=user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    updateUser,
    deleteUser,
    getUser,
    followAUser,
    unfollowAUser,
    getFollowers
}