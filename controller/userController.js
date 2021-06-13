import asyncHandler from "express-async-handler";
import User from '../models/User.js';
import generateToken from "../utils/generateToken.js";

//@desc   Auth users & get token
//@route  POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  //getting the email and password from the req body
  const { email, password } = req.body;

  //fetching the user for the DB
  const user = await User.findOne({ email });

  //if user was found and the password matched (checking using the matchPassword function attached to the user model)
  if (user && (await user.matchPassword(password))) {
    //returning user details in json format including the token generate with the help of the generateToke util func
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    //throw error if the user was not found
    res.status(401);
    throw new Error('Invalid email or password.');
  }

});

//@desc   Register a new users
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  //getting the name, email and password from the req body received upon registration
  const { name, email, password } = req.body;

  //fetching the user for the DB (to check if the user is already registered)
  const userExists = await User.findOne({ email });

  //if user was found throw an error since the email was already used
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  //creating a new user (save) also a password encryption will run upon registration
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data.')
  }

});

//@desc   Auth users profile
//@route  GET /api/users/login
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  //getting the user who sent the request
  const user = await User.findById(req.user._id);

  //if user exists then return users details
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    //throw error if user not found
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc   Update users profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  //getting the user by id who sent the request (logged in user)
  const user = await User.findById(req.user._id);

  //if user exists then return users details
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
      
  } else {
    //throw error if user not found
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc   Get all users
//@route  GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  //getting the user who sent the request
  const users = await User.find({});
  res.json(users);
});

//@desc   Delete user
//@route  DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  //getting the user who sent the request
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc   Get user by id
//@route  GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json( user );
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc   Update user
//@route  PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
}