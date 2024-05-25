import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password || !phone || !role) {
    return next(new ErrorHandler("All Fields are required"));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered"));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 200, res, "User registered successfully");
  // res.status(200).json({
  //     success:true,
  //     message:"User registered successfully",
  //     user
  // })
});

// user login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill all required fields"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }

  sendToken(user, 200, res, "User Login Successfully");
});

// user logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "User Logged Out",
    });
});

export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
