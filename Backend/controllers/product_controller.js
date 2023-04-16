import productModel from "../models/product_model.js";

//save product in data
//api
export async function addProduct(req, res) {
  console.log(req.body);
  const data = new productModel(req.body);
  const datasave = await data.save();
  console.log(datasave);
  res.status(200).send({ success: true, datasave });
}

export async function getProduct(req, res, next) {
  try {
    const response = await productModel.find({});
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}

//
// export async function getProduct(req, res) {
//   const data = await productModel.find({});
//   res.send(JSON.stringify(data));
// }
