const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel
};
