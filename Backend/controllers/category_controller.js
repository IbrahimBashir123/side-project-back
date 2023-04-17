import categoryModel from "../models/category_model.js";

export function getAll(req, res, next) {
  categoryModel.find({}, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

export async function getCategory(req, res, next) {
  try {
    const response = await categoryModel.find({});
    res.status(200).send({ success: true, response });
  } catch (err) {
    next(err);
  }
}

//get by id
export function get(req, res, next) {
  let { id } = req.params;
  categoryModel.findOne({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

//save category in data
//add category
export async function addCategory(req, res) {
  console.log(req.body);
  const data = new categoryModel(req.body);
  const datasave = await data.save();
  console.log(datasave);
  res.status(200).send({ success: true, datasave });
}

export function updateCategory(req, res, next) {
  const id = req.params.id;
  const newCategory = req.body;
  categoryModel
    .findByIdAndUpdate(id, newCategory, {
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

  categoryModel
    .findOneAndDelete({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "deleted successfully" });
      } else {
        fs.unlinkSync(response.name);
        res.status(200).send({ status: 200, message: "NOT FOUND" });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}

// export function deleteOne(req, res, next) {
//   categoryModel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// }
