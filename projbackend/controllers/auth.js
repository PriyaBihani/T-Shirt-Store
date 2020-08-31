const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: errors.array()[0].msg,
      });
   }

   const user = new User(req.body);

   user.save((err, user) => {
      if (err) {
         return res.status(400).json({
            err: 'NOT able to save user in DB',
         });
      }

      return res.json({
         name: user.name,
         email: user.email,
         id: user._id,
      });
   });
};

exports.signin = (req, res) => {
   const { email, password } = req.body;

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: errors.array()[0].msg,
      });
   }

   User.findOne({ email }, (err, user) => {
      if (err || !user) {
         return res.status(404).json({
            error: 'User email does not exist',
         });
      }

      if (!user.authenticate(password)) {
         return res.status(401).json({
            error: 'Email and password do not match',
         });
      }

      // Create Token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      // Put token in cookie
      res.cookie('token', token, { expire: new Date() + 9999 });

      // Send response to front end
      const { _id, name, email, role } = user;

      return res.json({ token, user: { _id, name, email, role } });
   });
};

exports.signout = (req, res) => {
   console.log('Cookies: ', req.cookies);
   res.clearCookie('token');
   return res.json({
      message: 'User signout successfully',
   });
};

// Protected Route
exports.isSignedIn = expressJwt({
   secret: process.env.SECRET,
   userProperty: 'auth',
});

// Custom middlewares

// Through the front end we are gonna make a property inside the user which is called profile.(params)  This property is only going to be set if user is logged in. auth property is set by expressJwt.

// Sign in : user is signed in and can move around
// authenticated: user is authenticated and can change in its own account. if profile id is equal to auth id then user owns that account.

exports.isAuthenticated = (req, res, next) => {
   let checker = req.profile && req.auth && req.profile._id == req.auth._id;
   if (!checker) {
      return res.status(403).json({
         error: 'ACCESS DENIED',
      });
   }
   next();
};

exports.isAdmin = (req, res, next) => {
   if (req.profile.role === 0) {
      return res.status(403).json({
         error: 'ACCESS DENIED',
      });
   }
   next();
};
