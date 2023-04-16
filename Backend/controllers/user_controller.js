import userModel from "../models/user_model.js";

//sign up
// creating new user
export async function signup(req, res) {
  console.log(req.body);
  const { email } = req.body;

  try {
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
    console.log(err);
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

//get an author by id
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



//delete an author by id
export function deleteOne(req, res, next) {
  let { id } = req.params;
  userModel.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  })
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
export async function login(req, res) {
  console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
}
