import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import User from "../Models/User.js";

//middleware that checks if the request has the token issues  by the backend in order to protect specific routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //checks if the request has an auth header and if it starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //takes the second part of the header which is the jwt  token
      token = req.headers.authorization.split(' ')[1];
      //decodes the jwt token using the secret phrase
      const decoded = await jwt.verify(token, process.env.JWT_TOKEN);

      //fetching the user and attaching the record to the request
      req.user = await User.findById(decoded.id).select('-password');

      //letting the request move forward
      next();
    }  catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed.')
    }
  }

  if (!token)  {
    res.status(401);
    throw new Error('Not authorized,  no token.');
  }
});

export {
  protect
}