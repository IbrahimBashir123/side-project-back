import productModel from "../models/product_model.js";

export function getAll(req, res, next) {
  productModel.find({}, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

export async function getProduct(req, res, next) {
  try {
    const response = await productModel.find({});
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}

//get by id
export function get(req, res, next) {
  let { id } = req.params;
  productModel.findOne({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

//save product in data
//add product
export async function addProduct(req, res) {
  console.log(req.body);
  const data = new productModel(req.body);
  const datasave = await data.save();
  console.log(datasave);
  res.status(200).send({ success: true, datasave });
}

export function updateProduct(req, res, next) {
  const id = req.params.id;
  const newProduct = req.body;
  productModel
    .findByIdAndUpdate(id, newProduct, {
      new: true,
      runValidators: true,
    })
    .then((update) => {
      console.log(update);
      if (update) {
        res.status(200).send(update);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

export async function deleteOne(req, res, next) {
  const { id } = req.params;

  productModel
    .findOneAndDelete({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "deleted successfully" });
      } else {
        fs.unlinkSync(response.image);
        res.status(200).send({ status: 200, message: "NOT FOUND" });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
