const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async(request, response) => {
  const body = request.body;
  if (!body.username || !body.password) {
    response.status(400).json({
      error: 'must have username and password'
    });
    return;
  }
  if (body.username.length <= 3 || body.password.length <= 3) {
    response.status(400).json({
      error: 'username and password are at least three characters are required.'
    });
    return;
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();
  response.json(savedUser);
});
usersRouter.get('/', async(request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

module.exports = usersRouter;