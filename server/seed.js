const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

const products = [

  {
    name: "Smart Watch",
    price: 1999,
    category: "Wearable",
    icon: "?",
    description: "Smart fitness watch with health tracking",
    stock: 20
  },

  {
    name: "Wireless Headphones",
    price: 2499,
    category: "Audio",
    icon: "??",
    description: "Wireless headphones with clear sound",
    stock: 15
  },

  {
    name: "Smart Phone",
    price: 14999,
    category: "Mobile",
    icon: "??",
    description: "Modern smartphone for everyday use",
    stock: 10
  },

  {
    name: "Laptop",
    price: 45999,
    category: "Computer",
    icon: "??",
    description: "Powerful laptop for students and developers",
    stock: 8
  },

  {
    name: "Bluetooth Speaker",
    price: 1599,
    category: "Audio",
    icon: "??",
    description: "Portable Bluetooth speaker",
    stock: 25
  },

  {
    name: "Smart Camera",
    price: 5999,
    category: "Camera",
    icon: "??",
    description: "Smart security camera",
    stock: 12
  },

  {
    name: "Gaming Mouse",
    price: 999,
    category: "Gaming",
    icon: "???",
    description: "High precision gaming mouse",
    stock: 30
  },

  {
    name: "Mechanical Keyboard",
    price: 1299,
    category: "Computer",
    icon: "??",
    description: "RGB mechanical keyboard",
    stock: 20
  },

  {
    name: "Gaming Headset",
    price: 2999,
    category: "Gaming",
    icon: "??",
    description: "Gaming headset with microphone",
    stock: 18
  },

  {
    name: "Tablet",
    price: 18999,
    category: "Computer",
    icon: "??",
    description: "Portable tablet for study and entertainment",
    stock: 10
  }

];

async function seed() {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log("");
    console.log("==================================");
    console.log(" PRODUCTS ADDED TO MONGODB");
    console.log("==================================");
    console.log("");

    process.exit();

  } catch (error) {

    console.log("Seed Error:", error.message);

    process.exit(1);

  }

}

seed();
