import Listing from "../models/listing.modles.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({
    message: "Hello World!!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(AppError(401, "Invalid Account!!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // Search about it, this have something to do with security!!
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    ); // It will going to save user with new response not with the privious one we have to set it true

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(res.json(AppError(401, "Not logged in!!")));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json("user deleted sucessfully");
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req,res, next) => {
  if (req.user.id == req.params.id) {
    try {
      const listing = await Listing.find({userRef: req.params.id});
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  }else {
    return next(AppError(401,'You can only change your own listing!!'));
  }
};

export const getUser = async (req,res,next) => {
  try {
    const userId  = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(res.json(AppError(404, "User not found!!")));
    }
    const { password: pass, ...rest} = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}