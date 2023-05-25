const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  //Check for exisiting email
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('This email is already in used');
  }

  //Hashing Password to be stored in DB
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  //Create new user record in DB
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`user created ${user}`);

  //Handle error for user creation
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'login user' });
});

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Current User information' });
});

module.exports = { registerUser, loginUser, currentUser };
