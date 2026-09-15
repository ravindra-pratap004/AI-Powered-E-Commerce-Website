const express = require("express");

const Order = require("../models/Order");

const router = express.Router();


// CREATE ORDER

router.post("/", async (req, res) => {

  try {

    const {
      user,
      products,
      totalAmount
    } = req.body;

    if (!user || !products || !products.length) {

      return res.status(400).json({
        message: "Invalid order"
      });

    }

    const order =
      await Order.create({
        user,
        products,
        totalAmount
      });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Order failed"
    });

  }

});


// ALL ORDERS

router.get("/", async (req, res) => {

  try {

    const orders =
      await Order.find()
        .populate("user", "name email")
        .populate("products.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }

});

module.exports = router;
