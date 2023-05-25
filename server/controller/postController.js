const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { author, content, title, userID } = req.body;
  if (!author || !content || !title || !userID) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const post = await Post.create({
    author,
    content,
    title,
    userID,
  });

  res.json(post);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post Not Found!');
  }
  res.send(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post Not Found!');
  }
  try {
    await Post.deleteOne(post);
    res.send(`${post.id} is removed`);
  } catch (error) {}
});

module.exports = { getPosts, createPost, getPost, updatePost, deletePost };
