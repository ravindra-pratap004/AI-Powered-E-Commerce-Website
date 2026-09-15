const express = require("express");

const Product = require("../models/Product");

const router = express.Router();


// GET ALL PRODUCTS

router.get("/", async (req, res) => {

  try {

    const products = await Product.find().sort({
      createdAt: -1
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch products"
    });

  }

});


// SEARCH

router.get("/search", async (req, res) => {

  try {

    const q = req.query.q || "";

    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: q,
            $options: "i"
          }
        },
        {
          category: {
            $regex: q,
            $options: "i"
          }
        },
        {
          description: {
            $regex: q,
            $options: "i"
          }
        }
      ]
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: "Search failed"
    });

  }

});


// SINGLE PRODUCT

router.get("/:id", async (req, res) => {

  try {

    const product =
      await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: "Product not found"
    });

  }

});


// ADD PRODUCT

router.post("/", async (req, res) => {

  try {

    const product =
      await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create product"
    });

  }

});


// UPDATE

router.put("/:id", async (req, res) => {

  try {

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: "Update failed"
    });

  }

});


// DELETE

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed"
    });

  }

});


module.exports = router;
