import express from 'express';

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import seedRouter from './routes/seedRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error.message);
  });
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send({ message: error.message });
});

app.listen(PORT, () => {
  console.log(`server is running at http//:localhost:${PORT}`);
});
