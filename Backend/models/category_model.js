import mongoose from "mongoose";
const { Schema, model } = mongoose;

//category section

const schemaCategory = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
  },
  {
    collection: "categories",
  }
);
const categoryModel = model("category", schemaCategory);

export default categoryModel;
