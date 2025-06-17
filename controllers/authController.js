const User = require("../models/userSchema");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { JWT_SECRET_TOKEN, JWT_EXPIRE_TOKEN } = require("../config/index");

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET_TOKEN, { expiresIn: JWT_EXPIRE_TOKEN });
};

/*
 @access public 
 @http method POST 
 @endpoint /api/v1/auth/register
 
*/

exports.createUser = async (req, res, next) => {
  try {
    const profile = req.file;
    console.log(profile);
    const { username, email, password, role } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new AppError(`user is exists`, 409));
    }
    const newUser = await User.create({
      profilePic: profile,
      username,
      email,
      password,
      role,
    });

    res.status(201).json({
      status: "Success",
      message: "user is created",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 @access public 
 @http method POST 
 @endpoint /api/v1/auth/login
 
*/

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError(`Invalid email or password`, 401));
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      message: "Successfully login done",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError(
          "Your are not loggen in !, please login to get access",
          401
        )
      );
    }

    const decode = await jwt.verify(token, JWT_SECRET_TOKEN);
    // 3) check if user still exists
    const currentUser = await User.findById(decode.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does not longer exist.",
          401
        )
      );
    }
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Session expired. Please login again.", 401));
    }
    return next(new AppError("Invalid token. Please login again.", 401));
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`user role is not authorize to access this data`, 403)
      );
    }
    next();
  };
};
