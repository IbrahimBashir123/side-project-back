import mongoose from "mongoose";
// import { isEmail } from "validator";
import pkg from "validator";
const { isEmail } = pkg;

//schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },

    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
    },

    confirmPassword: {
      type: String,
      required: [true, "confirmPassword is required"],
      minLength: [6, "password must be at least 6 characters"],
    },

    image: {
      type: String,
      required: [true, "image is required"],
    },

    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
  }
);

//Model
const userModel = mongoose.model("user", userSchema);

export default userModel;
