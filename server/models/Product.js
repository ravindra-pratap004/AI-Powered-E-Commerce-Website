const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: "???"
    },

    description: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      default: 10
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
