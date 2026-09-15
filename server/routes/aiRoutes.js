const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

router.post("/recommend", async (req, res) => {

  try {

    const question =
      (req.body.question || "").toLowerCase();

    const products =
      await Product.find();

    let result = [];

    if (
      question.includes("laptop") ||
      question.includes("computer")
    ) {

      result = products.filter(
        p =>
          p.category.toLowerCase()
            .includes("computer")
      );

    }

    else if (
      question.includes("phone") ||
      question.includes("mobile")
    ) {

      result = products.filter(
        p =>
          p.category.toLowerCase()
            .includes("mobile")
      );

    }

    else if (
      question.includes("headphone") ||
      question.includes("speaker") ||
      question.includes("audio")
    ) {

      result = products.filter(
        p =>
          p.category.toLowerCase()
            .includes("audio")
      );

    }

    else if (
      question.includes("gaming") ||
      question.includes("game")
    ) {

      result = products.filter(
        p =>
          p.category.toLowerCase()
            .includes("gaming")
      );

    }

    else if (
      question.includes("watch")
    ) {

      result = products.filter(
        p =>
          p.category === "Wearable"
      );

    }

    else if (
      question.includes("cheap") ||
      question.includes("budget") ||
      question.includes("low price")
    ) {

      result =
        [...products]
          .sort(
            (a, b) =>
              a.price - b.price
          )
          .slice(0, 4);

    }

    else if (
      question.includes("premium") ||
      question.includes("expensive")
    ) {

      result =
        [...products]
          .sort(
            (a, b) =>
              b.price - a.price
          )
          .slice(0, 4);

    }

    else {

      result =
        products.slice(0, 4);

    }

    res.json({
      success: true,
      answer:
        "Here are my recommended products:",
      products: result
    });

  } catch (error) {

    res.status(500).json({
      message: "AI recommendation failed"
    });

  }

});

module.exports = router;
