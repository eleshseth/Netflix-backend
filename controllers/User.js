import { User } from '../models/userModal.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: 'Invalid Data',
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'invalid email or password',
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'invalid email or password',
        success: false,
      });
    }
    const tokenData = {
      id: user._id,
    };
    const token = await jwt.sign(tokenData, 'dfdsfsdfsfsdfsdffsfsdfsdff', {
      expiresIn: '1h',
    });
    return res
      .status(200)
      .cookie('token', token, { httpOnly: true })
      .json({
        message: `Welcome Back ${user.fullName}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie('token', '', { expiresIn: new Date(Date.now()), httpOnly: true })
    .json({
      message: 'user Logged out successfully',
      success: 'true',
    });
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: 'Invalid Data',
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: 'this user is already exist',
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: 'Account was created succesfully ',
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
