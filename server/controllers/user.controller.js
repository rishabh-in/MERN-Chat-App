const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcryptjs');
const { Users } = require('../Models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields")
  }

  const userExist = await Users.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await Users.create({ name, email, password, pic });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user")
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password');
  }
});

// /api/user?search=rishabh
const allUsers = asyncHandler(async (req, res) => {
  // const search = req.query.search;
  const keyword = req.query.search ? {
    "$or": [
      { name: { "$regex": req.query.search, "$options": "i" } },
      { email: { "$regex": req.query.search, "$options": "i" } }
    ]
  } : {};
  const users = await Users.find(keyword).find({ _id: { "$ne": req.user._id } });
  res.send(users)
});

// Just for testing
const deleteUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    await Users.deleteOne({ email });
    res.status(201).json({
      msg: "User deleted successfully"
    })
  } else {
    res.status(401).json({
      error: "Email does not exist"
    })
  }
})

module.exports = { registerUser, authUser, allUsers, deleteUser }