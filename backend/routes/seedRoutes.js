import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Delete existing products and insert new ones
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);

    // Delete existing users and insert new ones
    await User.deleteMany({});
    const createdUser = await User.insertMany(data.users);

    // Send a single response with combined data
    res.send({ createdProducts, createdUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default seedRouter;
