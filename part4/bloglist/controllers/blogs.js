const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { info } = require('../utils/logger');

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogRouter.post('/', async(request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token,process.env.SECRET);
  if(!request.token || !decodedToken.id){
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.json(result);
});
blogRouter.put('/:id', async(request, response) => {
  const id = request.params.id;
  const result = await Blog.findByIdAndUpdate(id, {
    ...request.body
  }, { new: true }).populate('user');
  response.json(result);
});
blogRouter.delete('/:id', async(request, response) => {
  const id = request.params.id;
  const decodedToken = jwt.verify(request.token,process.env.SECRET);
  if(!request.token || !decodedToken.id){
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(id);
  if(!blog || !user) {
    return response.status(401).json({
      error: 'blog or user has been deleted',
    });
  }
  info(blog);
  if(user._id.toString() === blog.user.toString()){
    blog.delete();
    response.status(204).end();
  } else {
    return response.status(401).json({
      error: 'Permission denied',
    });
  }
});
module.exports = blogRouter;