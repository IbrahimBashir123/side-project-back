import mongoose from "mongoose";
const { Schema, model } = mongoose;

//product section

const schemaProduct = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },

    image: {
      type: String,
      required: [true, "image is required"],
    },

    price: {
      type: String,
      required: [true, "price is required"],
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },
  },
  {
    collection: "products",
  }
);
const productModel = model("product", schemaProduct);

export default productModel;
