import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = { email: "", password: "" };

  //validation errors
  if (err.message.includes("user validation failed")) {
    console.log(Object.values(err.errors));
  }
};

//sign up
// creating new user
export async function signup(req, res) {
  console.log(req.body);
  const { email } = req.body;

  try {
    const token = jwt.sign(
      { user_id: doc._id, email, is_admin: doc.is_admin },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    res.cookie("auth_token", token, { maxAge: 5 * 60 * 60 * 1000 });
    res.status(200).send({ success: true, response });

    const result = await userModel.findOne({ email: email });

    console.log(result);

    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = await data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  } catch (err) {
    // console.log(err);
    const errors = handleErrors(err);
    res.status(500).send({ message: "Server error", alert: false });
  }
}

export async function getuser(req, res, next) {
  try {
    const response = await userModel.find({});
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}

//get by id
// export function get(req, res, next) {
//   let { id } = req.params;
//   userModel.findOne({ _id: id }, (err, response) => {
//     if (err) return next(err);
//     res.status(200).send({ success: true, response });
//   });
// }

//get an user by id
export function get(req, res, next) {
  let { id } = req.params;
  userModel.findOne({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

// export async function put(req, res, next) {
//   let { id } = req.params;
//   try {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//     req.body.password = hashedPassword;
//     userModel.findOneAndUpdate(
//       { _id: id },
//       req.body,
//       { new: true },
//       (err, response) => {
//         if (err) return next(err);
//         res.status(200).send({ sucess: true, response });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// }

//update a user by _id
export function put(req, res, next) {
  let { id } = req.params;
  let body = req.body;
  userModel.updateOne(
    { _id: id },
    {
      $set: body,
    },
    (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    }
  );
}

//delete user by id
// export function deleteOne(req, res, next) {
//   let { id } = req.params;
//   userModel.findOneAndDelete({ _id: id }, (err, response) => {
//     if (err) return next(err);
//     res
//       .status(200)
//       .send({ success: true, response, message: "Login Succesfully" });
//   });
// }

//delete an user by id
export function deleteOne(req, res, next) {
  let { id } = req.params;
  userModel.findByIdAndDelete({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

// export async function signup(req, res) {
//   console.log(req.body);
//   const { email } = req.body;

//  await userModel.findOne({ email: email }, (err, result) => {
//     console.log(result);
//     console.log(err);
//     if (result) {
//       res.send({ message: "Email id is already register", alert: false });
//     } else {
//       const data = userModel(req.body);
//       const save = data.save();
//       res.send({ message: "Successfully sign up", alert: true });
//     }
//   });
// }

//api login
// export async function login(req, res) {
//   console.log(req.body);
//   const { email } = req.body;
//   userModel.findOne({ email: email }, (err, result) => {
//     if (result) {
//       const dataSend = {
//         _id: result._id,
//         firstName: result.firstName,
//         lastName: result.lastName,
//         email: result.email,
//         image: result.image,
//       };
//       console.log(dataSend);
//       res.send({
//         message: "Login is successfully",
//         alert: true,
//         data: dataSend,
//       });
//     } else {
//       res.send({
//         message: "Email is not available, please sign up",
//         alert: false,
//       });
//     }
//   });
// }

export async function login(req, res) {
  console.log(req.body);
  const { email, password } = req.body;
  userModel.findOne({ email: email }, async (err, result) => {
    if (result) {
      const match = await bcrypt.compare(password, result.password);
      if (match) {
        const token = jwt.sign(
          { id: result._id, email, is_admin: user.is_admin },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.cookie("auth_token", token, {
          httpOnly: true,
          maxAge: 5 * 60 * 60 * 1000,
        }); // set cookie with token
        res.send({
          message: "Login is successful",
          alert: true,
          data: dataSend,
        });
      } else {
        res.send({
          message: "Incorrect password",
          alert: false,
        });
      }
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
}
