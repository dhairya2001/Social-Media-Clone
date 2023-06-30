const express = require('express');
const postsRoute=express.Router();
const { createPost, getPost ,deletePost, updatePost ,likeOrDislikePost, timelinePosts, profilePosts, addComment, updateComment, deleteComment} = require('../controllers/postsController.js');


postsRoute.post('/',createPost);
postsRoute.get('/:id',getPost);
postsRoute.delete('/:id',deletePost);
postsRoute.put('/:id',updatePost);

postsRoute.put('/:id/like',likeOrDislikePost);
postsRoute.get('/timeline/:userId',timelinePosts);
postsRoute.get('/profile/:username',profilePosts);

postsRoute.put('/:id/comment',addComment);
postsRoute.put('/:id/updateComment',updateComment);
postsRoute.delete('/:id/deleteComment',deleteComment);

module.exports=postsRoute;
