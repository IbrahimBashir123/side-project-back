import mongoose from "mongoose";

//schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },

    confirmPassword: {
      type: String,
    },

    image: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
    }
  },
  {
    collection: "users",
  }
);

//Model
const userModel = mongoose.model("user", userSchema);

export default userModel;
