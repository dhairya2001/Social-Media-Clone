const postModel=require('../models/postModel')
const userModel=require('../models/userModel')

const createPost=async(req,res)=>{
    const newPost=new postModel(req.body);    
    try {
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);       
    } catch (error) {
        res.status(500).json(error);
    }
}
const getPost=async(req,res)=>{
    try {
        const post =await postModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}
const deletePost=async(req,res)=>{
    try {
        const post=await postModel.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post Deleted");
        }
        else{
            res.status(403).json("You can only delete your post");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
const updatePost=async(req,res)=>{
    
    try {
        const post=await postModel.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post is updated");
        }
        else{
            res.status(403).json("You can update only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const likeOrDislikePost=async(req,res)=>{
    try {
        const post=await postModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("u liked a post");
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            // res.status(403).json("Your like has been removed");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const timelinePosts=async(req,res)=>{
    try {
        const currentUser=await userModel.findById(req.params.userId);
        const userPosts=await postModel.find({userId:currentUser._id});
        const friendPosts=await Promise.all(
            currentUser.followings.map((friendId)=>{
                return postModel.find({userId:friendId})
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
}

const profilePosts=async(req,res)=>{
    try {
        const user=await userModel.findOne({username:req.params.username});
        const posts=await postModel.find({userId:user._id});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
}


const addComment=async(req,res)=>{
    const {comment,userId}=req.body;
    try {
        const post=await postModel.findById(req.params.id);
        await post.updateOne({$push:{comments:{comment,userId}}});
        res.status(200).json("u commented on a post");
    } catch (error) {
        res.status(500).json(error)
    }
}
const deleteComment=async(req,res)=>{
    const {comment,userId}=req.body;
    try {
        const post =await postModel.findById(req.params.id);
        // const isFound=await postModel.find({comments:{comment:comment,userId:userId}}).lean();
        if(isFound){
            // await isFound.deleteOne();
            res.status(200).json("u deleted ur comment")
        }
        else{
            res.status(403).json("u can only delete your comment");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateComment=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
module.exports={createPost, getPost ,deletePost, updatePost ,likeOrDislikePost ,timelinePosts ,profilePosts , addComment, deleteComment, updateComment};